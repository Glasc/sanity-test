import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export type Post = {
  description: string
  name: string
  image: {
    _type: string
    asset: {}
  }
  id: string
}

export const getStaticProps: GetStaticProps = async () => {
  const url =
    "https://cteelkpu.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'rotmgPost'%5D%20%7B%0A%22id%22%3A%20_id%2C%0A%20%20%22name%22%3A%20name%2C%0A%20%20%22description%22%3A%20description%2C%0A%20%20%20%22image%22%3A%20image%0A%7D"
  const response = await fetch(url)
  const posts: Post[] = (await response.json()).result

  await fetch('https://sanity-test-sage.vercel.app/api/hello', {
    method: 'POST',
  })

  return {
    props: { posts },
    revalidate: 5,
  }
}

const Home: NextPage<{ posts: Post[] }> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.container}>
      <h1>Artists:</h1>
      <ul>
        {posts?.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a>{post.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
