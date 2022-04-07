import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

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
  private baseURL = 'https://viacep.com.br';

  constructor(private httpService: HttpService) {}

  async getCepData(cep: number): Promise<CEP> {
    const { data: cepData } = await this.httpService
      .get<Promise<CEP>>(`${this.baseURL}/ws/${cep}/json/`)
      .toPromise();

    return cepData;
  }
}
