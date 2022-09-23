import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '..'

export const getStaticPaths: GetStaticPaths = async () => {
  const url =
    "https://cteelkpu.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'rotmgPost'%5D%20%7B%0A%22id%22%3A%20_id%2C%0A%20%20%22name%22%3A%20name%2C%0A%20%20%22description%22%3A%20description%2C%0A%20%20%20%22image%22%3A%20image%0A%7D"
  const response = await fetch(url)
  const posts: Post[] = (await response.json()).result
  return {
    paths: posts?.map((post) => ({
      params: { id: post.id },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  const path = params?.id

  const url = `https://cteelkpu.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'rotmgPost'%20%26%26%20_id%3D%3D'${path}'%5D%20%7B%0A%20%20%22id%22%3A%20_id%2C%0A%20%20%22name%22%3A%20name%2C%0A%20%20%22image%22%3A%20image%2C%0A%20%20%22description%22%3A%20description%0A%7D`

  const response = await fetch(url)
  const post: Post = (await response.json()).result[0]

  return {
    props: { post },
    revalidate: 5,
  }
}

const id = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Link href='/'>Go back</Link>
      <h1>Name: {post?.name}</h1>
      <p>Desc: {post?.description}</p>
    </div>
  )
}

export default id
