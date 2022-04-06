import { FiltersDto } from './filters.dto';

export class PaginationDto {
  page: number;
  limit: number;
  filters?: FiltersDto;
}
