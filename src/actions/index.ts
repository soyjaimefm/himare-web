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

  mailchimpSuscribe: defineAction({
    accept: 'form',
    handler: async (formData) => {
      const name = formData.get("name");
      const email = formData.get("email");

      const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
      };

      const response = await fetch(
        `https://${import.meta.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${import.meta.env.MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.MAILCHIMP_API_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: response.statusText,
        });
      }

      return response.ok;
    },
  }),
};
