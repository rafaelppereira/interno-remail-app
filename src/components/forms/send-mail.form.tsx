"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import { api } from "@/lib/axios";
import { Button } from "../ui/button";

import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightCircle, Loader2 } from "lucide-react";

import Cookies from 'js-cookie';

const sendMailFormData = z.object({
  to: z
    .string({ required_error: "Por favor preencha esse campo" })
    .email({ message: 'Por favor digite um e-mail válido ex: exemplo@gmail.com' })
    .nonempty({ message: "Por favor preencha esse campo" }),
  subject: z
    .string({ required_error: "Por favor preencha esse campo" })
    .nonempty({ message: "Por favor preencha esse campo" }),
  message: z
    .string({ required_error: "Por favor preencha esse campo" })
    .nonempty({ message: "Por favor preencha esse campo" }),
});

type SendMailFormData = z.infer<typeof sendMailFormData>;

export function SendMailForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SendMailFormData>({
    resolver: zodResolver(sendMailFormData)
  });

  const { toast } = useToast()

  const name = Cookies.get('name');
  const email = Cookies.get('email');
  const apikey = Cookies.get('apikey');

  async function handleSendMailToUser(data: SendMailFormData) {
    try {
      if (!apikey) {
        return toast({
          title: 'Você precisa informar a APIKEY do Resend para enviar uma mensagem'
        })
      }

      if (!name) {
        return toast({
          title: 'Você precisa informar o nome dentro de configurações para enviar uma mensagem'
        })
      }

      if (!email) {
        return toast({
          title: 'Você precisa informar o e-mail dentro de configurações para enviar uma mensagem'
        })
      }

      await api.post('/send-mail', {
        to: data.to,
        subject: data.subject,
        message: data.message,
        resend_apikey: apikey,
        name: `${name} <${email}>`
      })

      toast({
        title: 'Mensagem enviada com sucesso ao destinatário',
        description: data.to
      })

      reset({
        message: '',
        subject: '',
        to: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSendMailToUser)} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="to">Enviar para</Label>
        <Input
          id="to"
          type="email"
          className="h-12"
          {...register("to")}
          disabled={isSubmitting}
          placeholder="Digite o e-mail do seu destinatário: exemplo@gmail.com"
        />
        
        {errors.to && <span className="block mt-2 text-sm text-red-500">*{errors.to.message}</span>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Título da mensagem</Label>
        <Input
          id="subject"
          className="h-12"
          disabled={isSubmitting}
          {...register("subject")}
          placeholder="Digite o título da sua mensagem"
        />

        {errors.subject && <span className="block mt-2 text-sm text-red-500">*{errors.subject.message}</span>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Corpo da mensagem</Label>
        <Textarea
          id="message"
          disabled={isSubmitting}
          {...register("message")}
          className="min-h-[150px] max-h-[250px]"
          placeholder="Digite o corpo da sua mensagem"
        />

        {errors.message && <span className="block mt-2 text-sm text-red-500">*{errors.message.message}</span>}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="submit" className="text-white" size={isSubmitting ? 'icon' : 'default'}>
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : 'Enviar mensagem'}
            </Button>
          </TooltipTrigger>

          <TooltipContent className="flex items-center">
            <ChevronRightCircle className="w-4 h-4 mr-2" />
            Clique para disparar o e-mail
          </TooltipContent>
        </Tooltip> 
      </TooltipProvider>
    </form>
  );
}
