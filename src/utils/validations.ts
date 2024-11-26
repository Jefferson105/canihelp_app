import { z } from 'zod';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const WHATSAPP_VALIDATION = z
    .string()
    .length(11, { message: 'Informe o DDD com o número completo' })
    .regex(phoneRegExp, { message: 'Insira um número de telefone válido' })
    .min(1, { message: 'Telefone obrigatório' });

export const NAME_AND_LASTNAME_VALIDATION = z
    .string()
    .min(1, { message: 'Nome obrigatório' });

export const EMAIL_VALIDATION = z
    .string()
    .min(1, { message: 'email:O e-mail é obrigatório' })
    .email({ message: 'email:Utilize um e-mail válido' });

export const PASSWORD_VALIDATION = z
    .string()
    .min(1, { message: 'password:A senha é obrigatória' })
    .min(6, { message: 'password:Sua senha precisa ter no mínimo 6 dígitos' });

//Check password strength
const hasNumber = (myString) => /\d/.test(myString);

const hasUpperCase = (string) => /[A-Z]/.test(string);

export const checkPassword = (pass) => {
    let steps = null;

    if (pass.length < 8) steps = 'Minimo 8 caracteres;';

    if (!hasNumber(pass))
        steps = steps
            ? steps + ' pelo menos 1 numero;'
            : 'Pelo menos 1 numero;';

    if (!hasUpperCase(pass))
        steps = steps
            ? steps + ' pelo menos 1 maiuscula.'
            : 'Pelo menos 1 maiuscula;';

    return steps;
};

export const isMail = (email) => {
    const mailRgx = /\S+@\S+\.\S+/;
    return mailRgx.test(email);
};

export const createHelpSchema = z
    .object({
        Transport: z.object(
            {
                Origin: z.object({
                    Lat: z.number({
                        invalid_type_error:
                            'Por favor, informe um endereço de origem valido.'
                    }),
                    Lon: z.number(),
                    Address: z.string(),
                    Reference: z.optional(z.string()),
                    ShortLocation: z.string()
                }),
                Destiny: z.object({
                    Lat: z.number({
                        invalid_type_error:
                            'Por favor, informe um endereço de entrega valido.'
                    }),
                    Lon: z.number(),
                    Address: z.string(),
                    Reference: z.optional(z.string()),
                    ShortLocation: z.string()
                })
            },
            {
                invalid_type_error: 'Por favor, informe um endereço valido.'
            }
        ),
        CategoryID: z.string(),
        Description: z
            .string()
            .min(1, { message: 'Por favor, informe uma descrição.' }),
        Urgency: z.string({
            required_error: 'Por favor, informe a urgência do seu orçamento'
        }),
        Group: z.string(),
        Type: z.string()
    })
    .strict();
