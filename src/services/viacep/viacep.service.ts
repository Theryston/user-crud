import { Injectable } from '@nestjs/common';

import { Axios } from 'axios';

interface CEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable()
export class ViacepService {
  private viacepProvider: Axios;

  constructor() {
    this.viacepProvider = new Axios({
      baseURL: 'https://viacep.com.br/',
      headers: {
        'Content-Type': 'application/json',
      },
      transformResponse: (data) => JSON.parse(data),
    });
  }

  async getCepData(cep: number): Promise<CEP> {
    const { data: cepData } = await this.viacepProvider.get<Promise<CEP>>(
      `/ws/${cep}/json/`,
    );

    return cepData;
  }
}
