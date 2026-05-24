import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Page } from '@/components/page';
import { useRequest } from '@/hooks/use-request';
import { turmaStatusConstant } from '@/services/api/constants/turma-status';

export function CreateTurma() {
  const { cursoId } = useParams<{ cursoId: string }>();

  const { formSchema, mutate, isLoading } = useRequest({
    route: '/turmas',
    method: 'post',
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cursoId: cursoId || '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Turma criada com sucesso');
        reset({ cursoId: cursoId || '' });
      },
    });
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cadastrar Turma" hasBack />
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <FormInput control={control} name="titulo" label="Título da Turma" />
          <FormInput control={control} name="descricao" label="Descrição" />
          <FormInput
            control={control}
            name="quantidadeVagas"
            label="Quantidade de Vagas"
            type="number"
          />

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <FormInput
                control={control}
                name="dataInicio"
                label="Data de Início"
                type="date"
              />
            </div>
            <div style={{ flex: 1 }}>
              <FormInput
                control={control}
                name="dataFim"
                label="Data de Término"
                type="date"
              />
            </div>
          </div>

          <FormSelect
            control={control}
            name="status"
            label="Status"
            placeholder="Selecione um status"
            options={[
              {
                label: 'Disponível',
                value: turmaStatusConstant.DISPONIVEL,
              },
              {
                label: 'Encerrado',
                value: turmaStatusConstant.ENCERRADO,
              },
            ]}
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
