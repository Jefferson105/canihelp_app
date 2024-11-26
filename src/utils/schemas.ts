import { z } from 'zod';

const numberRegex = /^[0-9]+$/;

export const AddressSchema = z
    .object({
        City: z
            .string({ invalid_type_error: 'Nome da cidade invalido' })
            .min(1, { message: 'Nome da cidade obrigatório' }),
        Complement: z
            .string({ invalid_type_error: 'Complemento invalido' })
            .optional(),
        Country: z
            .string({ invalid_type_error: 'Nome do país invalido' })
            .min(1, { message: 'Nome do país obrigatório' }),
        Neighborhood: z
            .string({ invalid_type_error: 'Nome do bairro invalido' })
            .min(1, { message: 'Nome do bairro obrigatório' }),
        Number: z
            .string()
            .regex(numberRegex, {
                message: 'Insira um número de endereço válido'
            })
            .min(1, { message: 'Número obrigatório' }),
        PostCode: z
            .string({ invalid_type_error: 'Código postal invalido' })
            .min(1, { message: 'Código postal obrigatório' }),
        Show: z.boolean().optional(),
        State: z
            .string({ invalid_type_error: 'Nome do estado invalido' })
            .min(1, { message: 'Nome do estado obrigatório' }),
        Street: z
            .string({ invalid_type_error: 'Nome da rua invalido' })
            .min(1, { message: 'Nome da rua obrigatório' })
    })
    .strict();
