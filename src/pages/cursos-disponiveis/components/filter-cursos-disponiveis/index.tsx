import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import z from 'zod';

import { Button } from '@/components/button';
import { FormCheckboxGroup } from '@/components/form-checkbox-group';
import { FormInput } from '@/components/form-input';
import { cursoTemasMaped } from '@/constants/curso-temas-maped';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(formSchema),

    values: {
      titulo: searchParams.get('titulo') || '',
      temas: searchParams.get('temas')
        ? (searchParams.get('temas')?.split(',') as CursoTemas[])
        : [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    const newParams = new URLSearchParams();

    if (data.titulo) {
      newParams.set('titulo', data.titulo);
    }

    if (data.temas && data.temas.length > 0) {
      newParams.set('temas', data.temas.join(','));
    }

    setSearchParams(newParams);
  });

  const onClear = () => {
    reset({ titulo: '', temas: [] });
    setSearchParams(new URLSearchParams());
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput label="Título do curso" name="titulo" control={control} />
      <FormCheckboxGroup
        name="temas"
        control={control}
        label="Temas do Curso"
        options={optionsCheckboxGroup}
      />
      <Button type="submit">Pesquisar</Button>
      <Button type="button" variant="outline" onClick={onClear}>
        Limpar campos
      </Button>
    </form>
  );
}
