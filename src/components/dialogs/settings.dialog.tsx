"use client";

import { Cog, LinkIcon } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";

import { z } from "zod";
import Link from "next/link";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";

import Cookies from 'js-cookie';

const settingsFormData = z.object({
  name: z
    .string({ required_error: "Por favor preencha esse campo" })
    .nonempty({ message: "Por favor preencha esse campo" }),
  email: z
    .string({ required_error: "Por favor preencha esse campo" })
    .email({ message: 'Por favor digite um e-mail válido' })
    .nonempty({ message: "Por favor preencha esse campo" }),
  apikey: z
    .string({ required_error: "Por favor preencha esse campo" })
    .nonempty({ message: "Por favor preencha esse campo" }),
});

type SettingsFormData = z.infer<typeof settingsFormData>;

export function SettingsDialog() {
  const { get, entries } = useSearchParams()
  const pathname = usePathname();
  const router = useRouter()
  const { toast } = useToast()

  const name = Cookies.get('name');
  const email = Cookies.get('email');
  const apikey = Cookies.get('apikey');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormData),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      apikey: apikey ?? '',
    }
  });

  async function handleUpdateSettings(data: SettingsFormData) {
    Cookies.set('name', data.name)
    Cookies.set('email', data.email)
    Cookies.set('apikey', data.apikey)

    toast({
      title: 'Configurações atualizadas!'
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="text-white">
          <Cog className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajustes e preferências</DialogTitle>
          <DialogDescription>
            Faça as configurações necessárias para o envio do e-mail
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleUpdateSettings)}
          className="space-y-3"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Seu nome/Nome da empresa</Label>
            <Input
              id="name"
              className="h-12"
              {...register("name")}
              placeholder="Digite o seu nome ou noma da sua empresa"
            />

            {errors.name && (
              <span className="block mt-2 text-sm text-red-500">
                *{errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail/E-mail da empresa</Label>
            <Input
              id="name"
              type="email"
              className="h-12"
              {...register("email")}
              placeholder="Digite o seu e-mail ou e-mail da sua empresa"
            />

            {errors.email && (
              <span className="block mt-2 text-sm text-red-500">
                *{errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apikey">APIKEY Resend</Label>
            <Input
              id="apikey"
              className="h-12"
              {...register("apikey")}
              placeholder="Digite a sua APIKEY do Resend"
            />

            {errors.apikey && (
              <span className="block mt-2 text-sm text-red-500">
                *{errors.apikey.message}
              </span>
            )}

            <div className="flex justify-end py-2">
              <Link
                target="_blank"
                href="https://resend.com/login?redirectedFrom=%2Fapi-keys"
                className="text-muted-foreground underline underline-offset-2 text-sm flex items-center hover:text-primary transition-all"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Aonde posso conseguir minha APIKEY?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full text-white">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
