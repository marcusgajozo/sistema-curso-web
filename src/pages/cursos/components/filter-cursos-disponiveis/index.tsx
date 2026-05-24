import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/button';
import { FormCheckboxGroup } from '@/components/form-checkbox-group';
import { FormInput } from '@/components/form-input';
import { cursoTemasMaped } from '@/constants/curso-temas-maped';
import { useQueryParams } from '@/hooks/use-query-params';
import { ROUTES } from '@/routes/constants/routes-constants';
import {
  type CursoTemas,
  cursoTemasConstant,
} from '@/services/api/constants/curso-temas';

const formSchema = z.object({
  titulo: z.string().optional(),
  temas: z.array(z.enum(cursoTemasConstant)).optional(),
});

const optionsCheckboxGroup = Object.entries(cursoTemasMaped).map(
  ([key, text]) => ({
    value: key,
    label: text,
  }),
);

export function FilterCursosDisponiveis() {
  const { queryParams, setQueryParams } = useQueryParams();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),

    values: {
      titulo: (queryParams.titulo as string) || '',
      temas: queryParams.temas
        ? ((queryParams.temas as string).split(',') as CursoTemas[])
        : [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    setQueryParams({
      titulo: data.titulo?.trim() || null,
      temas: data.temas && data.temas.length > 0 ? data.temas.join(',') : null,
      page: 1,
    });
  });

  const onClear = () => {
    reset({ titulo: '', temas: [] });
    setQueryParams({ titulo: null, temas: null, page: 1 });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput label="Título do curso" name="titulo" control={control} />
      <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
        <FormCheckboxGroup
          name="temas"
          control={control}
          label="Temas do Curso"
          options={optionsCheckboxGroup}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type="button" variant="outline" onClick={onClear}>
            Limpar filtro
          </Button>
          <Button type="submit">Pesquisar</Button>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '20px 0', justifyContent: 'end' }}>
        <Button to={ROUTES.CREATE_CURSO}>Cadastrar Curso</Button>
      </div>
    </form>
  );
}
