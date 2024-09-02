/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pets').del()
  await knex('pets').insert([
    {
      owner_id: '1',
      name: 'Sir Whiskers',
      bio: 'A cat who loves to chase laser pointers and naps on keyboards.',
      wins: 5,
      losses: 85,
      img_url: '/images/SirWhiskers.png',
    },
    {
      owner_id: 'google-oauth2|107804123972815340859',
      name: 'Lady Barkalot',
      bio: "A dog whose bark is louder than its bite, but it's all in good fun.",
      wins: 2,
      losses: 90,
      img_url: '/images/LadyBarkalot.png',
    },
    {
      owner_id: '2',
      name: 'Lord Nibbles',
      bio: 'A mischievous hamster who loves to hide food in his cheeks for later.',
      wins: 70,
      losses: 10,
      img_url: '/images/LordNibbles.png',
    },
    {
      owner_id: 'google-oauth2|107804123972815340859',
      name: 'Captain Fluffy',
      bio: 'A rabbit who hops into action but sometimes trips over his own ears.',
      wins: 3,
      losses: 80,
      img_url: '/images/CaptainFluffy.png',
    },
    {
      owner_id: '2',
      name: 'Mistress Purrs-a-Lot',
      bio: "A cat who loves to sit in your lap just as you're about to stand up.",
      wins: 60,
      losses: 5,
      img_url: '/images/PurrsALot.png',
    },
    {
      owner_id: 'google-oauth2|107804123972815340859',
      name: 'The Howling Hound',
      bio: 'A dog who howls at every siren, passing car, and the occasional leaf.',
      wins: 50,
      losses: 30,
      img_url: '/images/HowlingHound.png',
    },
    {
      owner_id: '4',
      name: 'Princess Paws',
      bio: "A cat with a royal attitude who thinks she's the queen of everything.",
      wins: 1,
      losses: 85,
      img_url: '/images/PrincessPaws.png',
    },
    {
      owner_id: 'google-oauth2|107804123972815340859',
      name: 'Major Mischief',
      bio: 'A ferret who loves to hide things just to watch you search for them.',
      wins: 40,
      losses: 45,
      img_url: '/images/MajorMischief.png',
    },
    {
      owner_id: 'google-oauth2|107804123972815340859',
      name: 'Count Claws',
      bio: 'A cat who tries to act tough but usually ends up purring.',
      wins: 55,
      losses: 10,
      img_url: '/images/CountClaws.png',
    },
  ])
}
