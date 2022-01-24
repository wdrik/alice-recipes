import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

type Recipes = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  image_url: string;
};

interface RecipesProps {
  recipes: Recipes[];
}

export default function Home({ recipes }: RecipesProps) {
  return (
    <>
      <Header />

      <main>
        <h2>Receitas da Alice! </h2>

        {recipes.map((recipe) => (
          <div key={recipe.slug}>
            <Link href={`/receitas/${recipe.slug}`}>
              <a>
                <Image
                  src={recipe.image_url}
                  alt={recipe.title}
                  width={100}
                  height={100}
                />

                <time>{recipe.updatedAt}</time>
                <h2>{recipe.title}</h2>
                <p>{recipe.excerpt}</p>
              </a>
            </Link>

            <hr />
          </div>
        ))}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<any>(
    [Prismic.predicates.at('document.type', 'recipe')],
    {
      fetch: ['publication.title', 'publication.content', 'publication.image'],
      pageSize: 100,
    }
  );

  // console.log(JSON.stringify(response, null, 2));

  const recipes = response.results.map((recipe) => {
    return {
      slug: recipe.uid,
      image_url: recipe.data.recipe_image.url,
      title: RichText.asText(recipe.data.title),
      excerpt:
        recipe.data.content.find((content: any) => content.type === 'paragraph')
          ?.text ?? '',
      updateAt: new Date(
        String(recipe.last_publication_date)
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    props: {
      recipes,
    },
  };
};
