import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { FormCheckboxGroup } from '@/components/form-checkbox-group';
import { FormInput } from '@/components/form-input';
import { Page } from '@/components/page';
import { cursoTemasMaped } from '@/constants/curso-temas-maped';
import { useRequest } from '@/hooks/use-request';

const temaOptions = Object.entries(cursoTemasMaped).map(([value, label]) => ({
  value,
  label,
}));

export function CreateCurso() {
  const { formSchema, mutate, isLoading } = useRequest({
    route: '/cursos',
    method: 'post',
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Curso criado com sucesso');
        reset();
      },
    });
  });

  return (
    <Page.Root>
      <Page.Content>
        <Page.Header title="Cadastrar Curso" hasBack />
        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <FormInput control={control} name="titulo" label="Título do curso" />
          <FormInput
            control={control}
            name="descricao"
            label="Descrição do curso"
          />
          <FormInput
            control={control}
            name="urlImagem"
            label="URL da imagem"
            type="url"
          />
          <FormCheckboxGroup
            control={control}
            name="temas"
            label="Temas do curso"
            options={temaOptions}
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
