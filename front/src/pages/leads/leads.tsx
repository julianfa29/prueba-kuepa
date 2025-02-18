import { app } from "@/atoms/kuepa";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { leadService } from "@/services/leadService";

export interface LeadsProps {}

export default function Leads(props?: LeadsProps) {
  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: "kuepa",
      module: "leads",
      window: "crm",
      back: null,
      accent: "purple",
      breadcrumb: [
        {
          title: "Leads",
          url: "/leads",
        },
      ],
    });
  }, []);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [program, setProgram] = useState("");

  const handleSubmit = async (formData: React.FormEvent<HTMLFormElement>) => {
    formData.preventDefault();
    try {
      const response = await leadService.upsert({
        name,
        lastName,
        email,
        cellphone,
        program,
      });
      console.log("Lead guardado:", response);
    } catch (error) {
      console.error("Error al guardar lead:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 mx-10">
        <h1 className="text-3xl font-medium">Registro de prospectos</h1>
        <p className="text-xl">Ingresa nuevos prospectos a la plataforma</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label>Nombres</label>
            <Input
              className="w-[50%]"
              placeholder="Primer y/o segundo nombre"
              value={name}
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              type="text"
              required
            ></Input>
          </div>
          <div>
            <label>Apellidos</label>
            <Input
              className="w-[50%]"
              placeholder="Apellido completo"
              value={lastName}
              autoFocus
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              id="lastName"
              type="text"
              required
            ></Input>
          </div>
          <div>
            <label>Correo</label>
            <Input
              className="w-[50%]"
              placeholder="Correo electrónico"
              value={email}
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="text"
              required
            ></Input>
          </div>
          <div>
            <label>Teléfono</label>
            <Input
              className="w-[50%]"
              placeholder="Teléfono celular"
              value={cellphone}
              autoFocus
              onChange={(e) => {
                setCellphone(e.target.value);
              }}
              id="cellphone"
              type="number"
              required
            ></Input>
          </div>
          <div>
            <label>Programa de Interés</label>
            <Input
              className="w-[50%]"
              placeholder="Programa de Interés"
              value={program}
              autoFocus
              onChange={(e) => {
                setProgram(e.target.value);
              }}
              id="program"
              type="text"
              required
            ></Input>
          </div>
          <span className="mt-5 flex text-sm">
            <button className="font-semibold hover:bg-accent bg-purple-500 w-[50%] h-9">
              Enviar
            </button>
          </span>
        </form>
      </div>
    </>
  );
}
