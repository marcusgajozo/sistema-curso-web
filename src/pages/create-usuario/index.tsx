import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { Page } from '@/components/page';
import { useRequest } from '@/hooks/use-request';

export function CreateUsuario() {
  const { formSchema, mutate, isLoading } = useRequest({
    route: '/usuarios',
    method: 'post',
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Usuário criado com sucesso');
        reset();
      },
    });
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cadastrar Usuário" />
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <FormInput control={control} name="nome" label="Nome do usuário" />
          <FormInput
            control={control}
            name="email"
            label="Email do usuáro"
            type="email"
          />
          <div>
            <Button type="submit" isLoading={isLoading}>
              Cadastrar
            </Button>
          </div>
        </form>
      </Page.Content>
    </Page.Root>
  );
}
