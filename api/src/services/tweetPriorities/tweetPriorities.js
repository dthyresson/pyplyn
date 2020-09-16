import { db } from 'src/lib/db'

export const tweetPriorities = () => {
  return db.tweetPriority.findMany()
}

export const createTweetPriority = async ({ tweetId, uid, label }) => {
  const tweetPriority = await db.tweetPriority.create({
    data: {
      tweet: {
        connect: { id: tweetId },
      },
      uid,
      label,
    },
    include: { tweet: true },
  })

  return tweetPriority
}

export const createTweetPriorities = async (tweet) => {
  return tweet.entry?.document?.priorities?.map(async (priority) => {
    const tweetPriority = await createTweetPriority({
      tweetId: tweet.id,
      uid: priority.id,
      label: priority.label,
    })

    priority.searchTerms?.parts?.map(
      async (term) =>
        await db.tweetPriorityTerm.create({
          data: {
            tweetPriority: {
              connect: { id: tweetPriority.id },
            },
            uid: term.id,
            label: term.label,
          },
          include: { tweetPriority: true },
        })
    )

    return tweetPriority
  })
}

export const TweetPriority = {
  tweet: (_obj, { root }) =>
    db.tweetPriority.findOne({ where: { id: root.id } }).tweet(),
  terms: (_obj, { root }) =>
    db.tweetPriority.findOne({ where: { id: root.id } }).tweetPriorityTerms(),
}

// "priorities": [
//   {
//     "id": "enterprise/dthyressondt/priority/37f42e7d-521c-41d7-849b-d26c35cbb092",
//     "label": "Wine",
//     "searchTerms": {
//       "parts": [
//         {
//           "id": "nlp/f/entity/wd:282",
//           "label": "Wine"
//         }
//       ]
//     },
//     "actionTimestamp": 1600217778830
//   }
// ],
