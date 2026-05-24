import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { useQueryParams } from '@/hooks/use-query-params';
import { ROUTES } from '@/routes/constants/routes-constants';

const formSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
});

export function FilterUsuarios() {
  const { queryParams, setQueryParams } = useQueryParams();

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),

    values: {
      nome: (queryParams.nome as string) || '',
      email: (queryParams.email as string) || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    setQueryParams({
      nome: data.nome?.trim() || null,
      email: data.email?.trim() || null,
      page: 1,
    });
  });

  const onClear = () => {
    reset({ nome: undefined, email: undefined });
    setQueryParams({ nome: null, email: null, page: 1 });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput label="Nome do usuário" name="nome" control={control} />
      <FormInput label="Email do usuário" name="email" control={control} />
      <div style={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type="button" variant="outline" onClick={onClear}>
            Limpar filtro
          </Button>
          <Button type="submit">Pesquisar</Button>
        </div>
      </div>
      <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => navigate(ROUTES.CREATE_USUARIO)}>
          Cadastrar usuário
        </Button>
      </div>
    </form>
  );
}
