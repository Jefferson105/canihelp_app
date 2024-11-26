const get_https = async (opcoes_https): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(
                `https://${opcoes_https.hostname}${opcoes_https.path}`,
                {
                    headers: opcoes_https?.headers || {}
                }
            );

            const data = await res.json();

            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};

const round = (valor, precisao) => {
    const multiplicador = Math.pow(10, precisao || 0);
    return Math.round(valor * multiplicador) / multiplicador;
};

const getByEndereco = async (
    endereco
): Promise<{ lat: number; lon: number }> => {
    return new Promise(async (resolve, reject) => {
        const precisao = 4;

        endereco = encodeURI(endereco);

        const opcoes_https = {
            hostname: 'nominatim.openstreetmap.org',
            headers: {
                'User-Agent': 'coordenadas-do-cep-npm-module'
            },
            path:
                '/search?country=Brazil&q=' + endereco + '&format=json&limit=1'
        };

        try {
            let dados_endereco = await get_https(opcoes_https);

            if (dados_endereco.length === 0) {
                reject(404);
            } else {
                let { lat, lon } = dados_endereco[0];

                const coords = {
                    lat: round(parseFloat(lat), precisao),
                    lon: round(parseFloat(lon), precisao)
                };

                resolve(coords);
            }
        } catch (err) {
            reject(err);
        }
    });
};

const getInfoCep = async (cep): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const opcoes_https = {
            hostname: 'viacep.com.br',
            path: '/ws/' + cep + '/json/'
        };

        try {
            let resposta = await get_https(opcoes_https);

            if (typeof resposta.erro !== 'undefined') {
                reject(400);
            } else {
                resolve(resposta);
            }
        } catch (err) {
            reject(err);
        }
    });
};

export const getByCep = async (cep): Promise<{ lat: number; lon: number }> => {
    return new Promise(async (resolve, reject) => {
        const busca_aproximada = true;

        try {
            //PEGA AS INFORMAÇÕES DO CEP DIGITADO
            let info_cep = await getInfoCep(cep);

            const endereco_completo =
                info_cep.uf +
                ' ' +
                info_cep.localidade +
                ' ' +
                info_cep.bairro +
                ' ' +
                info_cep.logradouro;

            const endereco_aprox = info_cep.uf + ', ' + info_cep.localidade;

            //COM BASE NAS INFORMAÇÕES DO CEP, ELE GERA UMA STRING
            //CONTENDO O ENDEREÇO COMPLETO, E ASSIM BUSCA O MESMO
            //USANDO A API DO OPEN STREET MAP (NOMINATIM)
            getByEndereco(endereco_completo)
                .then((coords) => {
                    info_cep.lat = coords.lat;
                    info_cep.lon = coords.lon;

                    resolve(info_cep);
                })
                .catch((err) => {
                    //CASO NÃO SEJA ENCONTRADO O ENDEREÇO USANDO-O COMPLETO
                    //ELE SERÁ BUSCADO USANDO O ENDEREÇO APROXIMANDO
                    if (busca_aproximada) {
                        if (err === 404) {
                            getByEndereco(endereco_aprox)
                                .then((coords) => {
                                    info_cep.lat = coords.lat;

                                    info_cep.lon = coords.lon;

                                    resolve(info_cep);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        } else {
                            reject(err);
                        }
                    } else {
                        reject(err);
                    }
                });
        } catch (err) {
            reject(err);
        }
    });
};
