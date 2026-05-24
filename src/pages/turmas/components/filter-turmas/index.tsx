import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { useQueryParams } from '@/hooks/use-query-params';

const formSchema = z.object({
  titulo: z.string().optional(),
});

export function FilterTurmas() {
  const { queryParams, setQueryParams } = useQueryParams();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),

    values: {
      titulo: (queryParams.titulo as string) || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    setQueryParams({
      titulo: data.titulo?.trim() || null,
      page: 1,
    });
  });

  const onClear = () => {
    reset({ titulo: '' });
    setQueryParams({ titulo: null, temas: null, page: 1 });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput label="Título da turma" name="titulo" control={control} />
      <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type="button" variant="outline" onClick={onClear}>
            Limpar filtro
          </Button>
          <Button type="submit">Pesquisar</Button>
        </div>
      </div>
    </form>
  );
}
