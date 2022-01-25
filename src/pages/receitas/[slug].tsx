import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

interface RecipesProps {
  recipe: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
    image_url: string;
  };
}

export default function Recipe({ recipe }: RecipesProps) {
  return (
    <>
      <Header />

      <main>
        <article>
          <h1>{recipe.title}</h1>

          <Image
            src={recipe.image_url}
            alt={recipe.title}
            width={500}
            height={500}
          />

          <div dangerouslySetInnerHTML={{ __html: recipe.content }} />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { slug } = query;

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID<any>('recipe', String(slug), {});

  const recipe = {
    slug,
    image_url: response.data.recipe_image.url,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(
      String(response.last_publication_date)
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return {
    props: {
      recipe,
    },
  };
};
