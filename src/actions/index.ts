import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async (formData) => {
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const service = formData.getAll("service");
      const formSource = formData.get("formSource");

      const { data, error } = await resend.emails.send({
        from: 'HIMARE <himare@loveactually.es>',
        to: ['quitinavarrom@gmail.com'],
        subject: `HIMARE-FORMULARIO ${formSource}`,
        html: `${name} se ha puesto en contacto con Himare a través del formulario de servicios. Sus datos son los siguientes:<br><br>
        Nombre: ${name}<br><br>
        Email: ${email}<br><br>
        Servicios que le interesan: ${service.join(', ')}<br><br>
        Ha dejado este mensaje:<br>
        ${message}<br><br>
        Este formulario se ha rellenado en la página: ${formSource}
        `
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
  sendPresent: defineAction({
    accept: 'json',
    handler: async (dataInput) => {
      const { data, error } = await resend.emails.send({
        from: 'HIMARE <himare@loveactually.es>',
        to: ['quitinavarrom@gmail.com'],
        subject: `FELIZ SAN VALENTÍN`,
        html: `El otro día me dijiste una cosa en la que tenías toda la razón, hace demasiado tiempo que no te escribo una carta.<br>
        Así que pensé que hoy tenía la oportunidad, pero como últimamente me tienes motivado con este proyecto tan bonito he preferido hacerlo de una forma un poquito más especial. <br>

        Sé que últimamente no están siendo nuestros mejores meses, pero quiero que sepas que yo sigo yendo CON TODO igual que en 2020 cuando vivía en Albacete y te acabába de conocer. <br>
        Ahora mismo esto necesita un poco de paciencia y trabajo pero estoy seguro de que juntos podemos con todo. <br>

        Aquí tienes tu regalo, tenía clara la forma pero no el qué hasta que ayer mismo me díste la idea perfecta. <br>
        Creo que este festival fue uno de los planes más sencillos y más bonitos que pudimos hacer el año pasado. <br>
        Este año puede ser un poco diferente (hemos fichado a Marinita) pero quiero repetir contigo una y mil veces.<br>
        Porque contigo todo es siempre más bonito. Siempre le das a las cosas ese toque tan tuyo que hace que los detalles más normales sean los más especiales a la vez.<br>
        TE QUIERO PRECIOSA, PIÑITA, AMOR
        <br><br>
        https://venta.enterticket.es/entradas?data=eyJvcmRlciI6IjUxMzJsVGtLMVhHcCIsImhhc2giOiIwQjhGRTBBQTkwOTJEOTVFOEY5RDk5RTUzMDJCMjZEOTQ4NDU3RkJDNUQxRjkwQTdDRjhBRkJFQTc2RThDNTAzIiwiY29kaWdvIjoiWkhTVEo5OVIifQ%3D%3D&dest=I&lang=es_ES`
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
    },
  }),
};
