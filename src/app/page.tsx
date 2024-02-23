import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SendMailForm } from "@/components/forms/send-mail.form";
import { SettingsDialog } from "@/components/dialogs/settings.dialog";

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Github, Info, Paperclip } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Serviço de envio de e-mails | REMAIL'
}

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <CardTitle>Envio de e-mails</CardTitle>
            <CardDescription>
              Dispare e-mails para vários usuários ao mesmo tempo.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SettingsDialog />
          </div>
        </CardHeader>

        <CardContent>
          <SendMailForm />
        </CardContent>

        <CardFooter className="flex space-y-2 md:space-y-0 flex-col md:flex-row items-center justify-between">
          <HoverCard>
            <HoverCardTrigger>
              <span className="flex items-center text-muted-foreground text-sm hover:text-primary transition-all cursor-help">
                <Info className="w-4 h-4 mr-2" />
                Informações sobre o projeto
              </span>
            </HoverCardTrigger>

            <HoverCardContent className="space-y-2">
              <p className="text-sm tracking-tight mb-2">
                Esse projeto foi desenvolvido com o objetivo de trazer uma
                maneira fácil e dinâmica do uso da biblioteca RESEND
              </p>

              <Link
                href=""
                target="_blank"
                className="flex text-sm items-center gap-2 underline underline-offset-2 hover:text-muted-foreground"
              >
                <Github className="w-4 h-4" />
                <span>Repositório do projeto</span>
              </Link>

              <Link
                href=""
                target="_blank"
                className="flex text-sm items-center gap-2 underline underline-offset-2 hover:text-muted-foreground"
              >
                <Paperclip className="w-4 h-4" />
                <span>Documentação</span>
              </Link>
            </HoverCardContent>
          </HoverCard>

          <span className="text-sm text-muted-foreground">
            &copy; REMAIL {new Date().getFullYear()} | Desenvolvido por{" "}
            <Link
              className="underline underline-offset-2 hover:text-primary transition-all"
              href="https://github.com/rafaelppereira"
              target="_blank"
            >
              Rafael Pereira
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
