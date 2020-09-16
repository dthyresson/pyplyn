import { db } from 'src/lib/db'

export const tweetCategories = () => {
  return db.tweetCategory.findMany()
}

export const createTweetCategory = async ({ tweetId, uid, label }) => {
  const tweetCategory = await db.tweetCategory.create({
    data: {
      tweet: {
        connect: { id: tweetId },
      },
      uid,
      label,
    },
    include: { tweet: true },
  })

  return tweetCategory
}

export const createTweetCategories = async (tweet) => {
  return tweet.entry?.document?.categories?.map(async (category) => {
    return await createTweetCategory({
      tweetId: tweet.id,
      uid: category.id,
      label: category.label,
    })
  })
}

export const TweetCategory = {
  tweet: (_obj, { root }) =>
    db.tweetCategory.findOne({ where: { id: root.id } }).tweet(),
}
