import { GetManyOperadorUseCase } from './getManyUseCase';
import { makeOperador } from '../../factories/operadorFactory';
import { SortData } from '../../../services/sortData/sortData';

let getManyOperadorUseCase: GetManyOperadorUseCase;
let sortData: SortData;

describe('Get many Operador', () => {
  beforeEach(() => {
    sortData = {
      sortOperadoresByCreate: jest.fn(),
    } as any as SortData;

    getManyOperadorUseCase = new GetManyOperadorUseCase(sortData);
  });

  it('Should be able to get many operador', async () => {
    const testeOperadores = [...new Array(10)].map(() => makeOperador({}));

    (sortData.sortOperadoresByCreate as jest.Mock).mockResolvedValue(
      testeOperadores,
    );

    const result = await getManyOperadorUseCase.execute();

    expect(result).toEqual(testeOperadores);
  });
});
