import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, Copy, Play, Clock, X, Shuffle, Check, ArrowUp, Flame, Swords, Laugh, Heart, Mic, Clapperboard } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [justCopiedToast, setJustCopiedToast] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [randomClip, setRandomClip] = useState(null);
  const searchRef = useRef(null);

  const clips = [
      {
        id: 1,
        title: "Braveheart - Freedom Speech",
        quote: "They may take our lives, but they\'ll never take our freedom!",
        url: "https://www.youtube.com/watch?v=h2vW-rr9ibE",
        start: 297,
        end: 325,
        duration: 28,
        tags: ['#braveheart', '#freedom', '#theymighttakeourfreedom', '#nevtertakeourfreedom', '#williamwallace', '#melgibson', '#scotland', '#speech']
      },
      {
        id: 2,
        title: "Gladiator - My Name is Maximus",
        quote: "My name is Maximus Decimus Meridius...and I will have my vengeance, in this life or the next",
        url: "https://www.youtube.com/watch?v=C8IKFU9iXtw",
        start: 6,
        end: 42,
        duration: 36,
        tags: ['#gladiator', '#mynameismaximus', '#maximusdecimusmeridius', '#iwillhavemyvengeance', '#thisoforthenext', '#fathertoamurderedson', '#husbandtoamurderedwife', '#maximus', '#russellcrowe']
      },
      {
        id: 3,
        title: "Gladiator - What We Do in Life Echoes in Eternity",
        quote: "Brothers, what we do in life echoes in eternity",
        url: "https://www.youtube.com/watch?v=CDpTc32sV1Y",
        start: 52,
        end: 60,
        duration: 8,
        tags: ['#gladiator', '#echoesinenternity', '#whatwedoinlife', '#maximus', '#russellcrowe']
      },
      {
        id: 4,
        title: "Gladiator - I Will See You Again",
        quote: "I will see you again one day my friend, but not yet, not yet",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 10,
        end: 30,
        duration: 20,
        tags: ['#gladiator', '#iwillseeyouagain', '#notyet', '#maximus', '#russellcrowe']
      },
      {
        id: 5,
        title: "Gladiator - Shadows and Dust",
        quote: "We mortals are but shadows and dust, shadows and dust Maximus",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 35,
        end: 50,
        duration: 15,
        tags: ['#gladiator', '#shadowsanddust', '#wemortals', '#proximo', '#olivereed']
      },
      {
        id: 6,
        title: "Gladiator - Are You Not Entertained",
        quote: "Are you not entertained?! Are you not entertained?! Is this not why you are here?!",
        url: "https://www.youtube.com/watch?v=YbpCLqryN-Q",
        start: 32,
        end: 44,
        duration: 12,
        tags: ['#gladiator', '#areyounotentertained', '#maximus', '#russellcrowe', '#colosseum']
      },
      {
        id: 7,
        title: "Gladiator - Busy Little Bee",
        quote: "Busy little bee, aren\'t you",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 60,
        end: 80,
        duration: 20,
        tags: ['#gladiator', '#busylittlebee', '#commodus', '#joaquinphoenix']
      },
      {
        id: 8,
        title: "Gladiator - Walking Through Field",
        quote: "Elysium - Maximus walking through golden wheat fields",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 80,
        end: 105,
        duration: 25,
        tags: ['#gladiator', '#elysium', '#fields', '#maximus', '#russellcrowe']
      },
      {
        id: 9,
        title: "Rocky Balboa - Talking to Son",
        quote: "It ain\'t about how hard you hit. It\'s about how hard you can get hit and keep moving forward",
        url: "https://www.youtube.com/watch?v=D_Vg4uyYwEk",
        start: 50,
        end: 100,
        duration: 50,
        tags: ['#rocky', '#rockybalboa', '#itsnotabouthowhard', '#keepmovingforward', '#sylvesterstallone', '#speech', '#father']
      },
      {
        id: 10,
        title: "Rocky - Training Montage",
        quote: "Gonna fly now - iconic Rocky training montage with stairs",
        url: "https://www.youtube.com/watch?v=kbQDiuBNWJs",
        start: 10,
        end: 180,
        duration: 170,
        tags: ['#rocky', '#gonnaflytnow', '#trainingmontage', '#philadelphia', '#stairs', '#sylvesterstallone']
      },
      {
        id: 11,
        title: "Rocky IV - If He Dies He Dies",
        quote: "If he dies, he dies",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 10,
        end: 20,
        duration: 10,
        tags: ['#rocky', '#rocky4', '#ifhedies', '#ivandrago', '#dolphlundgren']
      },
      {
        id: 12,
        title: "Coach Carter - Our Deepest Fear",
        quote: "Our deepest fear is not that we are inadequate, our deepest fear is that we are powerful beyond measure",
        url: "https://www.youtube.com/watch?v=iSmkqocVoUQ",
        start: 10,
        end: 75,
        duration: 65,
        tags: ['#coachcarter', '#ourdeepestfear', '#powerfulbeyondmeasure', '#samuelljackson', '#mariannewilliamson', '#speech']
      },
      {
        id: 13,
        title: "Friday Night Lights - Perfection Speech",
        quote: "Being perfect is not about that scoreboard out there, it\'s about you and your relationship with yourself",
        url: "https://www.youtube.com/watch?v=OzHGLCi6gGc",
        start: 10,
        end: 80,
        duration: 70,
        tags: ['#fridaynightlights', '#perfection', '#beingperfect', '#billybobthornton', '#coachtaylor', '#lockerroom', '#speech']
      },
      {
        id: 14,
        title: "Friday Night Lights - Clear Eyes Full Hearts",
        quote: "Clear eyes, full hearts, can\'t lose",
        url: "https://www.youtube.com/watch?v=OzHGLCi6gGc",
        start: 80,
        end: 95,
        duration: 15,
        tags: ['#fridaynightlights', '#cleareyes', '#fullhearts', '#cantlose', '#billybobthornton', '#coachtaylor']
      },
      {
        id: 15,
        title: "Anchorman - 60% of the Time",
        quote: "60% of the time, it works every time",
        url: "https://www.youtube.com/watch?v=fmDYQFzaTAw",
        start: 25,
        end: 35,
        duration: 10,
        tags: ['#anchorman', '#sexpanther', '#60percentofthetime', '#workseverytime', '#willferrell', '#ronburgundy', '#paulrudd', '#brianfantana']
      },
      {
        id: 16,
        title: "Anchorman - It\'s the Pleats",
        quote: "Don\'t act like you\'re not impressed",
        url: "https://www.youtube.com/watch?v=fmDYQFzaTAw",
        start: 35,
        end: 50,
        duration: 15,
        tags: ['#anchorman', '#itsthepleats', '#dontactlikeyourentimpressed', '#willferrell', '#ronburgundy']
      },
      {
        id: 17,
        title: "Anchorman - That Escalated Quickly",
        quote: "Boy, that escalated quickly, I mean that really got out of hand fast",
        url: "https://www.youtube.com/watch?v=fmDYQFzaTAw",
        start: 50,
        end: 62,
        duration: 12,
        tags: ['#anchorman', '#thatescalatedquickly', '#thatreallygooutofhand', '#willferrell', '#ronburgundy']
      },
      {
        id: 18,
        title: "Step Brothers - Did We Just Become Best Friends (Full)",
        quote: "Did we just become best friends? Yep! Do you wanna go do karate in the garage? Yep!",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 10,
        end: 50,
        duration: 40,
        tags: ['#stepbrothers', '#didwejustbecombestfriends', '#karateinthegarage', '#willferrell', '#johncreilly']
      },
      {
        id: 19,
        title: "Step Brothers - Did We Just Become Best Friends (Short)",
        quote: "Did we just become best friends? YEP!",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 10,
        end: 22,
        duration: 12,
        tags: ['#stepbrothers', '#didwejustbecombestfriends', '#yep', '#willferrell', '#johncreilly']
      },
      {
        id: 20,
        title: "Step Brothers - The Catalina Wine Mixer",
        quote: "The fucking Catalina Wine Mixer!",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 100,
        end: 108,
        duration: 8,
        tags: ['#stepbrothers', '#catalinawinemixer', '#prestige', '#worldwide', '#willferrell', '#johncreilly']
      },
      {
        id: 21,
        title: "Step Brothers - Catalina Wine Mixer Performance",
        quote: "Por Ti Volare - full Catalina Wine Mixer performance",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 110,
        end: 200,
        duration: 90,
        tags: ['#stepbrothers', '#catalinawinemixer', '#portivolare', '#prestige', '#worldwide', '#willferrell', '#johncreilly', '#singing']
      },
      {
        id: 22,
        title: "Step Brothers - Derek Singing in Car",
        quote: "Derek and Alice singing in the car - Ice Ice Baby",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 200,
        end: 230,
        duration: 30,
        tags: ['#stepbrothers', '#derek', '#iceicebaby', '#adamscott', '#kathrynhahn', '#singing', '#car']
      },
      {
        id: 23,
        title: "Step Brothers - Dinosaur",
        quote: "That\'s a velociraptor",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 230,
        end: 245,
        duration: 15,
        tags: ['#stepbrothers', '#dinosaur', '#velociraptor', '#richardjenkins', '#dad', '#willferrell']
      },
      {
        id: 24,
        title: "Step Brothers - Did You Touch My Drum Set",
        quote: "Did you touch my drum set? No. Why are you all sweaty?",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 245,
        end: 270,
        duration: 25,
        tags: ['#stepbrothers', '#drumset', '#didyoutouchmydrumset', '#whyareyouallsweaty', '#willferrell', '#johncreilly']
      },
      {
        id: 25,
        title: "Step Brothers - Crossbows",
        quote: "Why are you so sweaty? I was watching Cops",
        url: "https://www.youtube.com/watch?v=zJ6QHsNFLpI",
        start: 270,
        end: 285,
        duration: 15,
        tags: ['#stepbrothers', '#crossbows', '#whyareyousosweaty', '#iwatching cops', '#willferrell']
      },
      {
        id: 26,
        title: "40 Year Old Virgin - You Know How I Know You\'re Gay",
        quote: "You know how I know you\'re gay?",
        url: "https://www.youtube.com/watch?v=cH7BMpzJw",
        start: 10,
        end: 60,
        duration: 50,
        tags: ['#40yearoldvirgin', '#youknowhowiknow', '#youknowhowyouregay', '#stevecarell', '#paulrudd', '#coldplay', '#macrame']
      },
      {
        id: 27,
        title: "40 Year Old Virgin - Kevin Hart Work Scene",
        quote: "Kevin Hart workplace rant scene",
        url: "https://www.youtube.com/watch?v=cH7BMpzJw",
        start: 60,
        end: 90,
        duration: 30,
        tags: ['#40yearoldvirgin', '#kevinhart', '#workrant', '#stevecarell']
      },
      {
        id: 28,
        title: "Superbad - McLovin",
        quote: "McLovin? What kind of a stupid name is that?",
        url: "https://www.youtube.com/watch?v=qBZ4DPDuaow",
        start: 30,
        end: 60,
        duration: 30,
        tags: ['#superbad', '#mclovin', '#fakeid', '#christophermintzplasse', '#jonahhill', '#fogell', '#hawaii']
      },
      {
        id: 29,
        title: "Superbad - Funny Thing About My Back",
        quote: "The funny thing about my back is it\'s located on my cock",
        url: "https://www.youtube.com/watch?v=qBZ4DPDuaow",
        start: 60,
        end: 75,
        duration: 15,
        tags: ['#superbad', '#funythingaboutmyback', '#jonahhill', '#seth']
      },
      {
        id: 30,
        title: "Superbad - Fa Sho",
        quote: "Fa sho... Fa sho",
        url: "https://www.youtube.com/watch?v=qBZ4DPDuaow",
        start: 75,
        end: 85,
        duration: 10,
        tags: ['#superbad', '#fasho', '#jonahhill', '#michaelcera']
      },
      {
        id: 31,
        title: "Wedding Crashers - Ma! The Meatloaf!",
        quote: "Ma! The meatloaf! FUCK!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 10,
        end: 20,
        duration: 10,
        tags: ['#weddingcrashers', '#mameatloaf', '#meatloaf', '#willferrell', '#chazzreinhold']
      },
      {
        id: 32,
        title: "Wedding Crashers - What an Idiot",
        quote: "What an idiot, what a loser",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 20,
        end: 30,
        duration: 10,
        tags: ['#weddingcrashers', '#whatanidiot', '#loser', '#willferrell', '#chazzreinhold']
      },
      {
        id: 33,
        title: "Wedding Crashers - Vince Vaughn Kisses Priest",
        quote: "Vince Vaughn kissing the priest scene",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 30,
        end: 45,
        duration: 15,
        tags: ['#weddingcrashers', '#vincevaughn', '#priest', '#church', '#awkward']
      },
      {
        id: 34,
        title: "Dumb and Dumber - Dead Bird to Blind Kid",
        quote: "You sold our dead bird to a blind kid? Petey didn\'t even have a head!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 45,
        end: 60,
        duration: 15,
        tags: ['#dumbanddumber', '#deadbird', '#blindkid', '#petey', '#nodhead', '#jimcarrey', '#jeffdaniels']
      },
      {
        id: 35,
        title: "Dumb and Dumber - Toilet Scene",
        quote: "Bathroom emergency laxative scene",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 60,
        end: 90,
        duration: 30,
        tags: ['#dumbanddumber', '#toilet', '#laxative', '#jeffdaniels', '#bathroom']
      },
      {
        id: 36,
        title: "Dumb and Dumber - So You\'re Saying There\'s a Chance",
        quote: "So you\'re saying there\'s a chance",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 90,
        end: 110,
        duration: 20,
        tags: ['#dumbanddumber', '#theresachance', '#soyousayingtheresachance', '#jimcarrey', '#oneInAmillion', '#delusional']
      },
      {
        id: 37,
        title: "Tommy Boy - Fat Guy in a Little Coat",
        quote: "Fat guy in a little coat",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 110,
        end: 125,
        duration: 15,
        tags: ['#tommyboy', '#fatguyinalittlecoat', '#chrisfarley', '#davidspade', '#dancing']
      },
      {
        id: 38,
        title: "A Few Good Men - You Can\'t Handle the Truth",
        quote: "You can\'t handle the truth!",
        url: "https://www.youtube.com/watch?v=9FnO3igOkOk",
        start: 120,
        end: 145,
        duration: 25,
        tags: ['#afewgoodmen', '#youcanthandlethetruth', '#jacknicholson', '#coljessup', '#tomcruise', '#courtroom']
      },
      {
        id: 39,
        title: "Godfather - Leave the Gun Take the Cannoli",
        quote: "Leave the gun, take the cannoli",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 145,
        end: 158,
        duration: 13,
        tags: ['#godfather', '#leavethegun', '#takecannoli', '#cannoli', '#clemenza', '#mob', '#mafia']
      },
      {
        id: 40,
        title: "Godfather - Look How They Massacred My Boy",
        quote: "Look how they massacred my boy",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 158,
        end: 172,
        duration: 14,
        tags: ['#godfather', '#massacredmyboy', '#lookhowtheymassacredmyboy', '#donvito', '#vitocorleone', '#marlonbrando', '#sonny']
      },
      {
        id: 41,
        title: "Good Will Hunting - It\'s Not Your Fault",
        quote: "It\'s not your fault",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 20,
        end: 80,
        duration: 60,
        tags: ['#goodwillhunting', '#itsnotyourfault', '#notYourFault', '#robinwilliams', '#mattdamon', '#therapy', '#breakdown']
      },
      {
        id: 42,
        title: "Good Will Hunting - I Had to See About a Girl",
        quote: "I had to go see about a girl",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 80,
        end: 95,
        duration: 15,
        tags: ['#goodwillhunting', '#seeaboutagirl', '#mattdamon', '#robinwilliams', '#skylar']
      },
      {
        id: 43,
        title: "Good Will Hunting - Math Classroom Genius",
        quote: "Will solves impossible math problem on hallway chalkboard",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 95,
        end: 130,
        duration: 35,
        tags: ['#goodwillhunting', '#math', '#chalkboard', '#genius', '#mattdamon', '#janitor', '#mit']
      },
      {
        id: 44,
        title: "Good Will Hunting - Wicked Smart Bar Scene",
        quote: "My boy\'s wicked smart",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 130,
        end: 165,
        duration: 35,
        tags: ['#goodwillhunting', '#wickedsmart', '#myboyswickedsmart', '#harvard', '#mattdamon', '#benaffleck', '#chuckie', '#bar']
      },
      {
        id: 45,
        title: "Good Will Hunting - How Bout Them Apples",
        quote: "How do you like them apples?",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 165,
        end: 180,
        duration: 15,
        tags: ['#goodwillhunting', '#howboutthemapples', '#howyoulikethemapples', '#mattdamon', '#phonenumber', '#skylar']
      },
      {
        id: 46,
        title: "Good Will Hunting - Ben Affleck Winning Ticket (Full)",
        quote: "You got a winning lottery ticket. Best day of my life would be knocking on your door and you not being there",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 180,
        end: 230,
        duration: 50,
        tags: ['#goodwillhunting', '#winningticket', '#bestdayofmylife', '#benaffleck', '#chuckie', '#friendship', '#full']
      },
      {
        id: 47,
        title: "Good Will Hunting - Ben Affleck Winning Ticket (Short)",
        quote: "Best day of my life would be if I knocked on your door and you weren\'t there",
        url: "https://www.youtube.com/watch?v=4Bb0OkEJPDc",
        start: 195,
        end: 215,
        duration: 20,
        tags: ['#goodwillhunting', '#winningticket', '#bestdayofmylife', '#benaffleck', '#chuckie', '#friendship', '#short']
      },
      {
        id: 48,
        title: "Shawshank Redemption - Get Busy Living",
        quote: "Get busy living, or get busy dying",
        url: "https://www.youtube.com/watch?v=n2d3jtlWQdc",
        start: 20,
        end: 32,
        duration: 12,
        tags: ['#shawshank', '#getbusyliving', '#getbusydying', '#timrobbins', '#andydufresne', '#prison']
      },
      {
        id: 49,
        title: "Shawshank Redemption - Rehabilitated Speech",
        quote: "Rehabilitated? Well now let me see",
        url: "https://www.youtube.com/watch?v=n2d3jtlWQdc",
        start: 32,
        end: 90,
        duration: 58,
        tags: ['#shawshank', '#rehabilitated', '#morganfreeman', '#red', '#parole', '#speech']
      },
      {
        id: 50,
        title: "Training Day - King Kong Ain\'t Got Shit (Full)",
        quote: "King Kong ain\'t got shit on me!",
        url: "https://www.youtube.com/watch?v=6gsnYBGmIgU",
        start: 10,
        end: 80,
        duration: 70,
        tags: ['#trainingday', '#kingkong', '#kingkongaintgotshitonme', '#denzelwashington', '#alonzo', '#breakdown', '#full']
      },
      {
        id: 51,
        title: "Training Day - King Kong Ain\'t Got Shit (Short)",
        quote: "King Kong ain\'t got shit on me!",
        url: "https://www.youtube.com/watch?v=6gsnYBGmIgU",
        start: 55,
        end: 65,
        duration: 10,
        tags: ['#trainingday', '#kingkong', '#kingkongaintgotshitonme', '#denzelwashington', '#short']
      },
      {
        id: 52,
        title: "Training Day - My Nigga",
        quote: "My nigga... my man",
        url: "https://www.youtube.com/watch?v=6gsnYBGmIgU",
        start: 80,
        end: 93,
        duration: 13,
        tags: ['#trainingday', '#mynigga', '#myman', '#denzelwashington', '#brotherhood']
      },
      {
        id: 53,
        title: "The Other Guys - Bar Mitzvah Story",
        quote: "I woke up and took the belt off my neck, got out of there. Bar Mitzvahs",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 10,
        end: 55,
        duration: 45,
        tags: ['#theotherguys', '#barmitzvah', '#willferrell', '#allengamble', '#absurd', '#story']
      },
      {
        id: 54,
        title: "The Other Guys - Shaved",
        quote: "You might think because of the beard I\'m not shaved",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 55,
        end: 72,
        duration: 17,
        tags: ['#theotherguys', '#shaved', '#willferrell', '#allengamble', '#beard', '#awkward']
      },
      {
        id: 55,
        title: "The Other Guys - Aim for the Bushes",
        quote: "Aim for the bushes?",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 72,
        end: 90,
        duration: 18,
        tags: ['#theotherguys', '#aimforthebushes', '#willferrell', '#markwahlberg', '#therock', '#samuelljackson', '#jump']
      },
      {
        id: 56,
        title: "The Other Guys - Dirty Mike and the Boys",
        quote: "Thanks for the F-shack, love Dirty Mike and the boys",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 90,
        end: 108,
        duration: 18,
        tags: ['#theotherguys', '#dirtymike', '#fshack', '#soupkitchen', '#prius', '#willferrell']
      },
      {
        id: 57,
        title: "The Other Guys - Dirty Mike Full Scene",
        quote: "We will have sex in your car, it will happen again - soup kitchen",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 90,
        end: 150,
        duration: 60,
        tags: ['#theotherguys', '#dirtymike', '#fshack', '#soupkitchen', '#prius', '#willferrell', '#full']
      },
      {
        id: 58,
        title: "The Other Guys - A-Rod Bi-Racial Angel",
        quote: "You shoulda shot A-Rod. He\'s a biracial angel",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 150,
        end: 165,
        duration: 15,
        tags: ['#theotherguys', '#arod', '#biracialangel', '#alexrodriguez', '#willferrell', '#markwahlberg']
      },
      {
        id: 59,
        title: "The Other Guys - A-Rod Full Scene",
        quote: "You shoulda shot A-Rod, tuna vs lion full scene",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 150,
        end: 200,
        duration: 50,
        tags: ['#theotherguys', '#arod', '#tuna', '#lion', '#biracialangel', '#willferrell', '#markwahlberg', '#full']
      },
      {
        id: 60,
        title: "The Other Guys - Gator Needs His Gat",
        quote: "Gator needs his gat, you punk ass bitch",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 200,
        end: 215,
        duration: 15,
        tags: ['#theotherguys', '#gator', '#gatorsneedshisgat', '#willferrell', '#allengamble', '#pimp']
      },
      {
        id: 61,
        title: "The Other Guys - 20 Miles Chase",
        quote: "Nobody leaves our house without making love to my wife! They chased us 20 miles!",
        url: "https://www.youtube.com/watch?v=rHRzVYBNLIY",
        start: 215,
        end: 235,
        duration: 20,
        tags: ['#theotherguys', '#20miles', '#20milechase', '#chasedus', '#willferrell']
      },
      {
        id: 62,
        title: "Miracle - Great Moments Speech",
        quote: "Great moments are born from great opportunities",
        url: "https://www.youtube.com/watch?v=DlZfvLBCQiY",
        start: 10,
        end: 85,
        duration: 75,
        tags: ['#miracle', '#greatmoments', '#bornfromgreatopportunities', '#herbbrooks', '#kurtrussell', '#hockey', '#olympics', '#speech']
      },
      {
        id: 63,
        title: "Miracle - Mike Eruzione USA",
        quote: "Mike Eruzione, Winthrop Massachusetts, United States of America",
        url: "https://www.youtube.com/watch?v=DlZfvLBCQiY",
        start: 85,
        end: 115,
        duration: 30,
        tags: ['#miracle', '#mikeeruzione', '#winthrope', '#unitedstatesofamerica', '#herbbrooks', '#kurtrussell', '#hockey']
      },
      {
        id: 64,
        title: "Miracle - Who Do You Play For",
        quote: "Who do you play for?",
        url: "https://www.youtube.com/watch?v=DlZfvLBCQiY",
        start: 115,
        end: 135,
        duration: 20,
        tags: ['#miracle', '#whodoYouplayfor', '#herbbrooks', '#kurtrussell', '#hockey', '#youwereborntobehockeyplayers']
      },
      {
        id: 65,
        title: "Miracle - Bruise on the Leg",
        quote: "A bruise on the leg is a hell of a long way from the heart",
        url: "https://www.youtube.com/watch?v=DlZfvLBCQiY",
        start: 135,
        end: 150,
        duration: 15,
        tags: ['#miracle', '#bruiseontheleg', '#herbbrooks', '#kurtrussell', '#hockey', '#tough']
      },
      {
        id: 66,
        title: "National Treasure - I\'m Gonna Steal It",
        quote: "I\'m going to steal it",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 150,
        end: 165,
        duration: 15,
        tags: ['#nationaltresure', '#imgonnastealit', '#declarationofindependence', '#nicolascage', '#benjaminfranklinGates']
      },
      {
        id: 67,
        title: "National Treasure - It Was Iron",
        quote: "It was iron, it was... pipe",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 165,
        end: 178,
        duration: 13,
        tags: ['#nationaltresure', '#itwasironItwaspipe', '#nicolascage', '#absurd']
      },
      {
        id: 68,
        title: "National Treasure - Secret Lies in Charlotte",
        quote: "The secret lies with Charlotte",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 178,
        end: 192,
        duration: 14,
        tags: ['#nationaltresure', '#secretlieswithcharlotte', '#nicolascage', '#treasure', '#revelation']
      },
      {
        id: 69,
        title: "Dodgeball - Bold Strategy Cotton",
        quote: "That\'s a bold strategy Cotton, let\'s see if it pays off for \'em",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 192,
        end: 206,
        duration: 14,
        tags: ['#dodgeball', '#boldstrategy', '#cotton', '#letsseeifitpaysoff', '#sarcastic', '#commentary']
      },
      {
        id: 70,
        title: "Tropic Thunder - Never Go Full Retard",
        quote: "Never go full retard. Everybody knows you never go full retard",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 206,
        end: 222,
        duration: 16,
        tags: ['#tropicthunder', '#nevergofullretard', '#robertdowneyjr', '#kirkLazarus', '#acting']
      },
      {
        id: 71,
        title: "Out Cold - Mexico Story",
        quote: "I was bummin in a hole down in what... Mexico story",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 222,
        end: 260,
        duration: 38,
        tags: ['#outcold', '#mexicostory', '#drunk', '#absurd', '#snowboarding']
      },
      {
        id: 72,
        title: "Send It Guy",
        quote: "Are you silly? I\'m still gonna send it",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 260,
        end: 278,
        duration: 18,
        tags: ['#sendit', '#stillgonnasendit', '#areyousilly', '#meme', '#viral']
      },
      {
        id: 73,
        title: "Talladega Nights - Spider Monkey",
        quote: "Chip I\'m gonna come at you like a spider monkey",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 278,
        end: 292,
        duration: 14,
        tags: ['#taladeganights', '#spidermonkey', '#comeatyoulikeaspidermonkey', '#willferrell', '#rickybobby']
      },
      {
        id: 74,
        title: "Talladega Nights - God Bless Troops",
        quote: "God bless our troops... Gentlemen, start your engines!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 292,
        end: 310,
        duration: 18,
        tags: ['#taladeganights', '#godblessourtroops', '#gentlemenstaryourengines', '#willferrell', '#rickybobby']
      },
      {
        id: 75,
        title: "Eric Clapton - Layla",
        quote: "Eric Clapton cigarette playing Layla guitar",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 310,
        end: 370,
        duration: 60,
        tags: ['#clapton', '#ericclapton', '#layla', '#guitar', '#cigarette', '#music', '#cool']
      },
      {
        id: 76,
        title: "Double Cheeked Up",
        quote: "Double cheeked up on a Thursday afternoon, hella ass",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 370,
        end: 386,
        duration: 16,
        tags: ['#doublecheeked', '#doublecheekedup', '#thursday', '#hellaass', '#meme']
      },
      {
        id: 77,
        title: "Remember the Titans - Left Side Strong Side",
        quote: "Left side! Strong side! Left side! Strong side!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 386,
        end: 403,
        duration: 17,
        tags: ['#rememberthetitans', '#leftside', '#strongside', '#leftsidestrongside', '#chant', '#football', '#defense']
      },
      {
        id: 78,
        title: "Remember the Titans - We Will Blitz All Night",
        quote: "I don\'t care if you block me or not",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 403,
        end: 420,
        duration: 17,
        tags: ['#rememberthetitans', '#blitzallnight', '#weWillBlitzAllNight', '#denzelwashington', '#football']
      },
      {
        id: 79,
        title: "Remember the Titans - 12 Brothers and Sisters",
        quote: "You have 12 brothers and sisters? Yeah",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 420,
        end: 435,
        duration: 15,
        tags: ['#rememberthetitans', '#12brothers', '#denzelwashington', '#football', '#family']
      },
      {
        id: 80,
        title: "Remember the Titans - Gettysburg Speech",
        quote: "This is where Gettysburg was fought. 50,000 men died right here on this field",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 435,
        end: 490,
        duration: 55,
        tags: ['#rememberthetitans', '#gettysburg', '#gettysburgspeech', '#denzelwashington', '#football', '#brotherhood', '#cemetery']
      },
      {
        id: 81,
        title: "Gone in 60 Seconds - Let\'s Ride",
        quote: "Ok, let\'s ride",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 490,
        end: 502,
        duration: 12,
        tags: ['#gonein60seconds', '#letsride', '#nicolascage', '#cars', '#cool']
      },
      {
        id: 82,
        title: "Forgetting Sarah Marshall - Go Fuck Myself",
        quote: "I\'m just gonna go fuck myself",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 502,
        end: 516,
        duration: 14,
        tags: ['#forgettingsarahmarshall', '#gofuckmyself', '#jasonsegel', '#awkward', '#defeated']
      },
      {
        id: 83,
        title: "Workaholics - Least Amount of Money",
        quote: "What is the least amount of money you could get paid to...",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 516,
        end: 545,
        duration: 29,
        tags: ['#workaholics', '#leastamountofmoney', '#whatistheleastamount', '#funny', '#absurd']
      },
      {
        id: 84,
        title: "Leeroy Jenkins - WoW Raid",
        quote: "Alright let\'s do this... LEEEEEEROY JENKINS!",
        url: "https://www.youtube.com/watch?v=mLyOj_QD4a4",
        start: 10,
        end: 65,
        duration: 55,
        tags: ['#leeroy', '#leeroyjenkins', '#atleastigotchicken', '#wow', '#worldofwarcraft', '#gaming', '#meme', '#raid']
      },
      {
        id: 85,
        title: "School of Rock - Stick It to the Man",
        quote: "Stick it to the man!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 545,
        end: 558,
        duration: 13,
        tags: ['#schoolofrock', '#stickittotheman', '#jackblack', '#music', '#performance']
      },
      {
        id: 86,
        title: "School of Rock - Immigrant Song",
        quote: "Immigrant Song Led Zeppelin performance",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 558,
        end: 580,
        duration: 22,
        tags: ['#schoolofrock', '#immigrantsong', '#ledzeppelin', '#jackblack', '#music']
      },
      {
        id: 87,
        title: "Wayne\'s World - Bohemian Rhapsody",
        quote: "Bohemian Rhapsody car scene headbanging",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 580,
        end: 640,
        duration: 60,
        tags: ['#waynesworld', '#bohemianrhapsody', '#queen', '#car', '#headbanging', '#mikemyers', '#wayneandgarth']
      },
      {
        id: 88,
        title: "Wayne\'s World - We\'re Not Worthy",
        quote: "We\'re not worthy",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 640,
        end: 658,
        duration: 18,
        tags: ['#waynesworld', '#notworthy', '#wearenotworthy', '#mikemyers', '#bow']
      },
      {
        id: 89,
        title: "Die Hard - Yippee Ki Yay",
        quote: "Yippee ki yay, motherfucker",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 658,
        end: 668,
        duration: 10,
        tags: ['#diehard', '#yippeekiyay', '#brucewillis', '#johnmcclane', '#christmas', '#badass']
      },
      {
        id: 90,
        title: "Predator - Get to the Chopper",
        quote: "Get to the chopper!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 668,
        end: 678,
        duration: 10,
        tags: ['#predator', '#gettothechopper', '#arnoldschwarzenegger', '#helicopter', '#action']
      },
      {
        id: 91,
        title: "Taken - Particular Set of Skills",
        quote: "I have a very particular set of skills. I will find you and I will kill you",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 678,
        end: 710,
        duration: 32,
        tags: ['#taken', '#particularsetofskills', '#iwillfindyou', '#iwillkillyou', '#liamneeson', '#threat', '#phone']
      },
      {
        id: 92,
        title: "The Matrix - Dodge This",
        quote: "Dodge this",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 710,
        end: 720,
        duration: 10,
        tags: ['#matrix', '#thematrix', '#dodgethis', '#trinity', '#carrieannmoss', '#badass', '#agent']
      },
      {
        id: 93,
        title: "Breaking Bad - I Am the One Who Knocks (Full)",
        quote: "I am not in danger Skyler, I am the danger. I am the one who knocks!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 720,
        end: 770,
        duration: 50,
        tags: ['#breakingbad', '#iamthedanger', '#iamtheonewhoknocks', '#heisenberg', '#walterwhite', '#bryancranston', '#skyler', '#full']
      },
      {
        id: 94,
        title: "Breaking Bad - I Am the One Who Knocks (Short)",
        quote: "I am the one who knocks!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 758,
        end: 770,
        duration: 12,
        tags: ['#breakingbad', '#iamtheonewhoknocks', '#heisenberg', '#walterwhite', '#bryancranston', '#short']
      },
      {
        id: 95,
        title: "Breaking Bad - Tight Tight Tight",
        quote: "Tight tight tight! Blue yellow pink, whatever man, just keep bringing me that!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 770,
        end: 790,
        duration: 20,
        tags: ['#breakingbad', '#tight', '#tighttighttight', '#tuco', '#crazy', '#meth']
      },
      {
        id: 96,
        title: "The Office - Parkour",
        quote: "Parkour! Parkour! Parkour!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 790,
        end: 840,
        duration: 50,
        tags: ['#theoffice', '#parkour', '#michaelscott', '#stevecarell', '#andybernard', '#dwightschrute']
      },
      {
        id: 97,
        title: "The Office - I Declare Bankruptcy",
        quote: "I declare bankruptcy!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 840,
        end: 855,
        duration: 15,
        tags: ['#theoffice', '#ideclarebankruptcy', '#bankruptcy', '#michaelscott', '#stevecarell']
      },
      {
        id: 98,
        title: "South Park - It\'s Gone (Full)",
        quote: "Aaaand it\'s gone",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 855,
        end: 890,
        duration: 35,
        tags: ['#southpark', '#anditsGone', '#itsgone', '#bank', '#money', '#economy', '#full']
      },
      {
        id: 99,
        title: "South Park - It\'s Gone (Short)",
        quote: "Aaaand it\'s gone",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 870,
        end: 878,
        duration: 8,
        tags: ['#southpark', '#anditsGone', '#itsgone', '#bank', '#money', '#short']
      },
      {
        id: 100,
        title: "Parks and Rec - Kim Kardashian Comeback",
        quote: "Chris Pratt Kim Kardashian comeback blooper",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 890,
        end: 920,
        duration: 30,
        tags: ['#parksandrec', '#kimkardashian', '#comeback', '#chrispratt', '#andydwyer', '#blooper']
      },
      {
        id: 101,
        title: "It\'s Always Sunny - Wildcard Bitches",
        quote: "Wildcard bitches! Yeehaw!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 920,
        end: 935,
        duration: 15,
        tags: ['#alwayssunny', '#wildcard', '#wildcardbitches', '#charlie', '#charlieday']
      },
      {
        id: 102,
        title: "Brooklyn Nine-Nine - I Want It That Way",
        quote: "Number 5. I want it that way. Tell me why!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 935,
        end: 975,
        duration: 40,
        tags: ['#brooklynninenine', '#iwantitthatway', '#backstreetboys', '#andysamberg', '#jakeperalta', '#lineup']
      },
      {
        id: 103,
        title: "Zoolander - Center for Ants",
        quote: "What is this? A center for ants?!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 975,
        end: 992,
        duration: 17,
        tags: ['#zoolander', '#centerforants', '#whatisthisacenterforants', '#benstiller', '#derekzoolander']
      },
      {
        id: 104,
        title: "Austin Powers - I Too Like to Live Dangerously",
        quote: "I also like to live dangerously",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 992,
        end: 1005,
        duration: 13,
        tags: ['#austinpowers', '#livedangerously', '#ialsoliketolivegangerously', '#mikemyers']
      },
      {
        id: 105,
        title: "Austin Powers - Steamroller Guy",
        quote: "Slow motion steamroller guy getting run over",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1005,
        end: 1040,
        duration: 35,
        tags: ['#austinpowers', '#steamroller', '#slowmotion', '#absurd', '#mikemyers']
      },
      {
        id: 106,
        title: "Austin Powers - Tent Scene Give It a Tug",
        quote: "Just give it a good tug tent scene",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1040,
        end: 1060,
        duration: 20,
        tags: ['#austinpowers', '#tent', '#silhouette', '#giveitatug', '#mikemyers', '#innuendo']
      },
      {
        id: 107,
        title: "Eastbound and Down - Plums",
        quote: "Let the boy watch. I can feel it down in my plums",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1060,
        end: 1080,
        duration: 20,
        tags: ['#eastboundanddown', '#plums', '#lettheboywatch', '#feelitinmyplums', '#dannymcbride', '#kennypowers']
      },
      {
        id: 108,
        title: "Lord of the Rings - Fly You Fools",
        quote: "Fly, you fools!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1080,
        end: 1098,
        duration: 18,
        tags: ['#lordoftherings', '#lotr', '#flyyoufools', '#gandalf', '#ianmckellen', '#moria', '#balrog', '#fellowship']
      },
      {
        id: 109,
        title: "Lord of the Rings - Theoden Arise Intro",
        quote: "Arise, arise, Riders of Theoden! Intro to Pelennor Fields",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1098,
        end: 1125,
        duration: 27,
        tags: ['#lordoftherings', '#lotr', '#theoden', '#arise', '#ridersoftheoden', '#pelennorfields', '#returnoftheking', '#battle']
      },
      {
        id: 110,
        title: "Lord of the Rings - Arise Riders Full Speech",
        quote: "Arise, arise, Riders of Theoden. Spears shall be shaken, shields shall be splintered",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1125,
        end: 1175,
        duration: 50,
        tags: ['#lordoftherings', '#lotr', '#theoden', '#arise', '#spearsshallbeshaken', '#shieldsshallbesplintered', '#rohirrim', '#pelennorfields']
      },
      {
        id: 111,
        title: "Lord of the Rings - DEATH!!!",
        quote: "DEATH!!!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1175,
        end: 1187,
        duration: 12,
        tags: ['#lordoftherings', '#lotr', '#death', '#theoden', '#pelennorfields', '#charge', '#battle']
      },
      {
        id: 112,
        title: "Lord of the Rings - A Day May Come",
        quote: "A day may come when the courage of men fails... but it is not this day",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1187,
        end: 1230,
        duration: 43,
        tags: ['#lordoftherings', '#lotr', '#adaymaycomewhenthecourageofmenfails', '#butitisnotthisday', '#aragorn', '#blackgate', '#viggo', '#viggomortensen', '#speech']
      },
      {
        id: 113,
        title: "Lord of the Rings - Keep Your Secrets",
        quote: "Alright then, keep your secrets",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1230,
        end: 1243,
        duration: 13,
        tags: ['#lordoftherings', '#lotr', '#keepyoursecrets', '#alrightthen', '#gandalf', '#frodo', '#elijahwood', '#meme']
      },
      {
        id: 114,
        title: "Lord of the Rings - You Bow to No One",
        quote: "My friends, you bow to no one",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1243,
        end: 1262,
        duration: 19,
        tags: ['#lordoftherings', '#lotr', '#youbowtonoone', '#myfriends', '#aragorn', '#hobbits', '#returnoftheking', '#viggomortensen']
      },
      {
        id: 115,
        title: "Lord of the Rings - I Am No Man",
        quote: "I am no man",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1262,
        end: 1273,
        duration: 11,
        tags: ['#lordoftherings', '#lotr', '#iamnoman', '#eowyn', '#witchking', '#badass', '#mirandaotto']
      },
      {
        id: 116,
        title: "Lord of the Rings - Beacons of Minas Tirith",
        quote: "The beacons of Minas Tirith! The beacons are lit! Gondor calls for aid",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1273,
        end: 1310,
        duration: 37,
        tags: ['#lordoftherings', '#lotr', '#beaconsareLit', '#minasTirith', '#gondorcallsforaid', '#gondor', '#aragorn', '#theoden']
      },
      {
        id: 117,
        title: "Lord of the Rings - GROND",
        quote: "GROND! GROND! GROND!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1310,
        end: 1328,
        duration: 18,
        tags: ['#lordoftherings', '#lotr', '#grond', '#batteringram', '#chant', '#minasTirith', '#siege']
      },
      {
        id: 118,
        title: "Lord of the Rings - Draw Swords Together",
        quote: "Let this be the hour when we draw swords together. Fell deeds awake, now for wrath",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1328,
        end: 1365,
        duration: 37,
        tags: ['#lordoftherings', '#lotr', '#letthisbethehour', '#wedrawswordstogether', '#felldeeds', '#helmsdeep', '#aragorn', '#theoden']
      },
      {
        id: 119,
        title: "Lord of the Rings - To War",
        quote: "To War!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1365,
        end: 1374,
        duration: 9,
        tags: ['#lordoftherings', '#lotr', '#towar', '#theoden', '#helmsdeep', '#charge', '#battle']
      },
      {
        id: 120,
        title: "Lord of the Rings - Po-ta-toes",
        quote: "Po-ta-toes! Boil \'em, mash \'em, stick \'em in a stew",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1374,
        end: 1400,
        duration: 26,
        tags: ['#lordoftherings', '#lotr', '#potatoes', '#boilem', '#mashem', '#stickeminastew', '#samwise', '#gollum', '#seanastin']
      },
      {
        id: 121,
        title: "Lord of the Rings - You Shall Not Pass (Full)",
        quote: "You shall not pass!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1400,
        end: 1445,
        duration: 45,
        tags: ['#lordoftherings', '#lotr', '#youshallnotpass', '#shallnotpass', '#gandalf', '#balrog', '#ianmckellen', '#moria', '#full']
      },
      {
        id: 122,
        title: "Independence Day - Presidential Speech",
        quote: "Today we celebrate our Independence Day!",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1445,
        end: 1520,
        duration: 75,
        tags: ['#independenceday', '#independencedayspeech', '#billpullman', '#4thofjuly', '#wedonotvanish', '#todaywecelebrate', '#speech']
      },
      {
        id: 123,
        title: "Miracle - Who Do You Play For (Mike Eruzione)",
        quote: "Who do you play for? Mike Eruzione!",
        url: "https://www.youtube.com/watch?v=DlZfvLBCQiY",
        start: 135,
        end: 155,
        duration: 20,
        tags: ['#miracle', '#whodoYouplayfor', '#mikeeruzione', '#herbbrooks', '#kurtrussell', '#hockey', '#youwereborntobehockeyplayers']
      },
      {
        id: 124,
        title: "Workaholics - Least Amount of Money (Full)",
        quote: "Ok what is the least amount of money you could get paid to...",
        url: "https://www.youtube.com/watch?v=G_yxBVfVFx0",
        start: 1520,
        end: 1560,
        duration: 40,
        tags: ['#workaholics', '#leastamountofmoney', '#whatistheleastamount', '#funny', '#absurd']
      },
      {
        id: 125,
        title: "The Office - That\'s What She Said",
        quote: "That\'s What She Said",
        url: "https://www.youtube.com/watch?v=dBUGfs9rwms",
        start: 720,
        end: 900,
        duration: 180,
        tags: ['#theoffice', '#thatswhatshesaid', '#michaelscott', '#stevecarell']
      },
      {
        id: 126,
        title: "The Office - NO GOD PLEASE NO",
        quote: "NO GOD PLEASE NO",
        url: "https://www.youtube.com/watch?v=CQ_eDE0OMds",
        start: 6300,
        end: 6780,
        duration: 480,
        tags: ['#theoffice', '#nogodpleaseno', '#michaelscott', '#stevecarell', '#toby']
      },
      {
        id: 127,
        title: "The Office - Why Are You The Way That You Are",
        quote: "Why Are You The Way That You Are",
        url: "https://www.youtube.com/watch?v=FdJpweIPbWw",
        start: 6480,
        end: 6660,
        duration: 180,
        tags: ['#theoffice', '#whyareyouthewayThatyouare', '#michaelscott', '#stevecarell', '#toby']
      },
      {
        id: 128,
        title: "The Office - Boom Roasted",
        quote: "Boom Roasted",
        url: "https://www.youtube.com/watch?v=nhkNYjljbMs",
        start: 2340,
        end: 2520,
        duration: 180,
        tags: ['#theoffice', '#boomroasted', '#michaelscott', '#stevecarell']
      },
      {
        id: 129,
        title: "The Office - Bears Beets Battlestar",
        quote: "Bears Beets Battlestar",
        url: "https://www.youtube.com/watch?v=WaaANll8h18",
        start: 2340,
        end: 2520,
        duration: 180,
        tags: ['#theoffice', '#bearsbeetsbattlestar', '#bearsbeets', '#jimhalpert', '#dwight', '#johnkrasinski', '#impersonation']
      },
      {
        id: 130,
        title: "The Office - Dwight You Ignorant Slut",
        quote: "Dwight You Ignorant Slut",
        url: "https://www.youtube.com/watch?v=P13ApHECCyY",
        start: 720,
        end: 780,
        duration: 60,
        tags: ['#theoffice', '#dwightyouignorantslut', '#michaelscott', '#stevecarell', '#dwight']
      },
      {
        id: 131,
        title: "The Office - It\'s Britney Bitch",
        quote: "It\'s Britney Bitch",
        url: "https://www.youtube.com/watch?v=00qHWp5eiHM",
        start: 900,
        end: 960,
        duration: 60,
        tags: ['#theoffice', '#itsbritneybitch', '#michaelscott', '#stevecarell']
      },
      {
        id: 132,
        title: "The Office - Prison Mike",
        quote: "Prison Mike",
        url: "https://www.youtube.com/watch?v=a7RoP1LKMeM",
        start: 2040,
        end: 2160,
        duration: 120,
        tags: ['#theoffice', '#prisonmike', '#michaelscott', '#stevecarell', '#dementors']
      },
      {
        id: 133,
        title: "The Office - Kevin\'s Chili",
        quote: "Kevin\'s Chili",
        url: "https://www.youtube.com/watch?v=WcYG-5b7448",
        start: 900,
        end: 1020,
        duration: 120,
        tags: ['#theoffice', '#kevinschili', '#kevinmalone', '#chili', '#spill']
      },
      {
        id: 134,
        title: "The Office - Did I Stutter",
        quote: "Did I Stutter",
        url: "https://www.youtube.com/watch?v=4Gm5jNvVSUc",
        start: 3300,
        end: 3420,
        duration: 120,
        tags: ['#theoffice', '#dididstutter', '#stanley', '#stanleyhudson']
      },
      {
        id: 135,
        title: "The Office - Well Well How The Turntables",
        quote: "Well Well How The Turntables",
        url: "https://www.youtube.com/watch?v=kin601UK394&t=410s",
        start: 7260,
        end: 7560,
        duration: 300,
        tags: ['#theoffice', '#howtheturntables', '#turntables', '#michaelscott', '#stevecarell']
      },
      {
        id: 136,
        title: "The Office - I Understand Nothing",
        quote: "I Understand Nothing",
        url: "https://www.youtube.com/watch?v=KsDR_16G0nA",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#theoffice', '#iunderstandnothing', '#michaelscott', '#stevecarell']
      },
      {
        id: 137,
        title: "The Office - Ryan Started The Fire",
        quote: "Ryan Started The Fire",
        url: "https://www.youtube.com/watch?v=_qxZOB9GxQM",
        start: 12600,
        end: 12840,
        duration: 240,
        tags: ['#theoffice', '#ryanstartedthefire', '#fire', '#dwight']
      },
      {
        id: 138,
        title: "The Office - Would I Rather Be Feared or Loved",
        quote: "Would I Rather Be Feared or Loved",
        url: "https://www.youtube.com/watch?v=cz4rqaQrsI0",
        start: 0,
        end: 480,
        duration: 480,
        tags: ['#theoffice', '#fearEdorloved', '#michaelscott', '#stevecarell']
      },
      {
        id: 139,
        title: "The Office - Abraham Lincoln Quote",
        quote: "Abraham Lincoln Quote",
        url: "https://www.youtube.com/watch?v=P_qDO0ippUs",
        start: 0,
        end: 840,
        duration: 840,
        tags: ['#theoffice', '#dontevernever', '#michaelscott', '#stevecarell']
      },
      {
        id: 140,
        title: "The Office - I Will Kill You",
        quote: "I Will Kill You",
        url: "https://www.youtube.com/watch?v=96ix3P9WaRc",
        start: 7320,
        end: 7440,
        duration: 120,
        tags: ['#theoffice', '#iwillkillyou', '#michaelscott', '#stevecarell']
      },
      {
        id: 141,
        title: "Parks and Rec - Treat Yo Self",
        quote: "Treat Yo Self",
        url: "https://www.youtube.com/watch?v=gSjM5B3QNlw",
        start: 780,
        end: 1020,
        duration: 240,
        tags: ['#parksandrec', '#treatyoself', '#tomhaverford', '#azizansari', '#donnameagle']
      },
      {
        id: 142,
        title: "Parks and Rec - I Know More Than You",
        quote: "I Know More Than You",
        url: "https://www.youtube.com/watch?v=IEhHEOIYgMY",
        start: 180,
        end: 240,
        duration: 60,
        tags: ['#parksandrec', '#iknowmorethanyou', '#ronswanson', '#nickofferman']
      },
      {
        id: 143,
        title: "Parks and Rec - Everything Hurts and I\'m Dying",
        quote: "Everything Hurts and I\'m Dying",
        url: "https://www.youtube.com/watch?v=-vmeMdTwy94",
        start: 4860,
        end: 4920,
        duration: 60,
        tags: ['#parksandrec', '#everythinghurts', '#imdying', '#leslieknope', '#amypoehler']
      },
      {
        id: 144,
        title: "Parks and Rec - I Have No Idea What I\'m Doing",
        quote: "I Have No Idea What I\'m Doing",
        url: "https://www.youtube.com/watch?v=pS_W8R25iJc",
        start: 0,
        end: 300,
        duration: 300,
        tags: ['#parksandrec', '#noidea', '#aprilludgate', '#auberyplaza']
      },
      {
        id: 145,
        title: "Parks and Rec - Ann Perkins!",
        quote: "Ann Perkins!",
        url: "https://www.youtube.com/watch?v=gVF9yulfWEk",
        start: 3240,
        end: 3420,
        duration: 180,
        tags: ['#parksandrec', '#annperkins', '#christraeger', '#roblowe']
      },
      {
        id: 146,
        title: "Parks and Rec - Ron Swanson Giggle",
        quote: "Ron Swanson Giggle",
        url: "https://www.youtube.com/watch?v=0mfd-V-X3Ko",
        start: 420,
        end: 480,
        duration: 60,
        tags: ['#parksandrec', '#ronswanson', '#ronswansongiggle', '#nickofferman', '#giggle']
      },
      {
        id: 147,
        title: "Parks and Rec - I Once Worked With a Guy",
        quote: "I Once Worked With a Guy",
        url: "https://www.youtube.com/watch?v=WGhcc3qFWh4",
        start: 2100,
        end: 2280,
        duration: 180,
        tags: ['#parksandrec', '#ronswanson', '#onceworkedwithaguy', '#nickofferman']
      },
      {
        id: 148,
        title: "Parks and Rec - End of the World Party",
        quote: "End of the World Party",
        url: "https://www.youtube.com/watch?v=lqZuprhCYB8",
        start: 3720,
        end: 4020,
        duration: 300,
        tags: ['#parksandrec', '#endoftheworld', '#chrispratt', '#andydwyer']
      },
      {
        id: 149,
        title: "Parks and Rec - Network Connectivity Problems",
        quote: "Network Connectivity Problems",
        url: "https://www.youtube.com/watch?v=LinpRhB4aWU",
        start: 1260,
        end: 0,
        duration: 3,
        tags: ['#parksandrec', '#ronswanson', '#wifi', '#technology', '#nickofferman']
      },
      {
        id: 150,
        title: "It\'s Always Sunny - So I Started Blasting",
        quote: "So I Started Blasting",
        url: "https://www.youtube.com/watch?v=AHzw4QvE2Do",
        start: 2460,
        end: 0,
        duration: 3,
        tags: ['#alwayssunny', '#sostartedblasting', '#anywayistartedblasting', '#frankreynolds', '#dannydevito']
      },
      {
        id: 151,
        title: "It\'s Always Sunny - I\'m a Five Star Man",
        quote: "I\'m a Five Star Man",
        url: "https://www.youtube.com/watch?v=u7WYFLlxGbA",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#alwayssunny', '#fivestarman', '#dennisreynolds', '#glennhowerton', '#narcissist']
      },
      {
        id: 152,
        title: "It\'s Always Sunny - Pepe Silvia",
        quote: "Pepe Silvia",
        url: "https://www.youtube.com/watch?v=_nTpsv9PNqo",
        start: 1740,
        end: 2220,
        duration: 480,
        tags: ['#alwayssunny', '#pepesilvia', '#charlie', '#charlieday', '#conspiracyboard', '#mail']
      },
      {
        id: 153,
        title: "It\'s Always Sunny - The Implication",
        quote: "The Implication",
        url: "https://www.youtube.com/watch?v=THvCDn8mGwo",
        start: 2520,
        end: 2580,
        duration: 60,
        tags: ['#alwayssunny', '#theimplication', '#dennisreynolds', '#glennhowerton', '#boat']
      },
      {
        id: 154,
        title: "It\'s Always Sunny - Rum Ham",
        quote: "Rum Ham",
        url: "https://www.youtube.com/watch?v=VVHm6k4wed8",
        start: 720,
        end: 840,
        duration: 120,
        tags: ['#alwayssunny', '#rumham', '#frankreynolds', '#dannydevito', '#ocean']
      },
      {
        id: 155,
        title: "It\'s Always Sunny - Can I Offer You an Egg",
        quote: "Can I Offer You an Egg",
        url: "https://www.youtube.com/watch?v=wPd2u5KXZzU",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#alwayssunny', '#caniofferyouanegg', '#tryingtime', '#frankreynolds', '#dannydevito']
      },
      {
        id: 156,
        title: "It\'s Always Sunny - The DENNIS System",
        quote: "The DENNIS System",
        url: "https://www.youtube.com/watch?v=Bg5ZrkaGlFA",
        start: 18360,
        end: 18780,
        duration: 420,
        tags: ['#alwayssunny', '#dennissystem', '#dennisreynolds', '#glennhowerton']
      },
      {
        id: 157,
        title: "It\'s Always Sunny - I Am the Golden God",
        quote: "I Am the Golden God",
        url: "https://www.youtube.com/watch?v=n5_-HnVhKlw",
        start: 2820,
        end: 3060,
        duration: 240,
        tags: ['#alwayssunny', '#goldengod', '#iamthegoldengod', '#dennisreynolds', '#glennhowerton']
      },
      {
        id: 158,
        title: "It\'s Always Sunny - Trash Man",
        quote: "Trash Man",
        url: "https://www.youtube.com/watch?v=JK0CL7bHbII",
        start: 360,
        end: 720,
        duration: 360,
        tags: ['#alwayssunny', '#trashman', '#frankreynolds', '#dannydevito', '#wrestling']
      },
      {
        id: 159,
        title: "It\'s Always Sunny - Through God All Things Are Possible",
        quote: "Through God All Things Are Possible",
        url: "https://www.youtube.com/watch?v=kd7AYQjKLGg",
        start: 840,
        end: 1080,
        duration: 240,
        tags: ['#alwayssunny', '#throughgod', '#jotthatdown', '#macmcdonald', '#robmcelhenney']
      },
      {
        id: 160,
        title: "It\'s Always Sunny - Suicide is Badass",
        quote: "Suicide is Badass",
        url: "https://www.youtube.com/watch?v=qi1KSXGhCOE&rco=1",
        start: 0,
        end: 300,
        duration: 300,
        tags: ['#alwayssunny', '#suicideisbadass', '#frankreynolds', '#dannydevito']
      },
      {
        id: 161,
        title: "It\'s Always Sunny - I\'m Playing Both Sides",
        quote: "I\'m Playing Both Sides",
        url: "https://www.youtube.com/watch?v=y9EYt_f12wo",
        start: 420,
        end: 540,
        duration: 120,
        tags: ['#alwayssunny', '#playingbothsides', '#macmcdonald', '#robmcelhenney']
      },
      {
        id: 162,
        title: "It\'s Always Sunny - I Haven\'t Even Begun to Peak",
        quote: "I Haven\'t Even Begun to Peak",
        url: "https://www.youtube.com/watch?v=PrxJJv_Za6M",
        start: 1140,
        end: 1740,
        duration: 600,
        tags: ['#alwayssunny', '#beguntopeak', '#ihaventevenbeguntopeak', '#dennisreynolds', '#glennhowerton']
      },
      {
        id: 163,
        title: "Seinfeld - No Soup For You",
        quote: "No Soup For You",
        url: "https://www.youtube.com/watch?v=ryNxl-lpOME",
        start: 7080,
        end: 7200,
        duration: 120,
        tags: ['#seinfeld', '#nosoupforyou', '#soupnazi', '#soup']
      },
      {
        id: 164,
        title: "Seinfeld - These Pretzels Are Making Me Thirsty",
        quote: "These Pretzels Are Making Me Thirsty",
        url: "https://www.youtube.com/watch?v=nIypMI_zXSQ",
        start: 840,
        end: 960,
        duration: 120,
        tags: ['#seinfeld', '#thesepretzelsaremakingmethirsty', '#kramer', '#michaelrichards']
      },
      {
        id: 165,
        title: "Seinfeld - Serenity Now",
        quote: "Serenity Now",
        url: "https://www.youtube.com/watch?v=auNAvO4NQnY",
        start: 1320,
        end: 1500,
        duration: 180,
        tags: ['#seinfeld', '#serenitynow', '#frankcostanza', '#jerrystiller']
      },
      {
        id: 166,
        title: "Seinfeld - Not That There\'s Anything Wrong With That",
        quote: "Not That There\'s Anything Wrong With That",
        url: "https://www.youtube.com/watch?v=rGAyQAkXajg",
        start: 9120,
        end: 9240,
        duration: 120,
        tags: ['#seinfeld', '#nothingwrongwiththat', '#notthatthereanythingwrongwiththat', '#jerry', '#jerryseinfeld']
      },
      {
        id: 167,
        title: "Seinfeld - Was That Wrong",
        quote: "Was That Wrong",
        url: "https://www.youtube.com/watch?v=Td67kYY9mdQ",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#seinfeld', '#wasthatwrong', '#georgecostanza', '#jasonalexander', '#fired']
      },
      {
        id: 168,
        title: "Seinfeld - Yada Yada Yada",
        quote: "Yada Yada Yada",
        url: "https://www.youtube.com/watch?v=3CKyWu87W78",
        start: 3660,
        end: 3840,
        duration: 180,
        tags: ['#seinfeld', '#yadayadayada', '#elaine', '#julialouisdreyfus']
      },
      {
        id: 169,
        title: "Seinfeld - I Was in the Pool",
        quote: "I Was in the Pool",
        url: "https://www.youtube.com/watch?v=GG2dF5PS0bI",
        start: 900,
        end: 1440,
        duration: 540,
        tags: ['#seinfeld', '#shrinkage', '#iwasinthepool', '#georgecostanza', '#jasonalexander']
      },
      {
        id: 170,
        title: "Seinfeld - Festivus",
        quote: "Festivus",
        url: "https://www.youtube.com/watch?v=1njzgXSzA-A",
        start: 0,
        end: 720,
        duration: 720,
        tags: ['#seinfeld', '#festivus', '#frankcostanza', '#jerrystiller', '#featsofstrength']
      },
      {
        id: 171,
        title: "Seinfeld - Kramer\'s Entrance",
        quote: "Kramer\'s Entrance",
        url: "https://www.youtube.com/watch?v=3xde0TX7IWI",
        start: 120,
        end: 360,
        duration: 240,
        tags: ['#seinfeld', '#kramersEntrance', '#kramer', '#michaelrichards', '#slide', '#door']
      },
      {
        id: 172,
        title: "Seinfeld - Master of My Domain",
        quote: "Master of My Domain",
        url: "https://www.youtube.com/watch?v=7VSDTMUVSL4",
        start: 2940,
        end: 3120,
        duration: 180,
        tags: ['#seinfeld', '#masterofmydomain', '#thecontest', '#jerry', '#george']
      },
      {
        id: 173,
        title: "Seinfeld - Newman!",
        quote: "Newman!",
        url: "https://www.youtube.com/watch?v=k9_8YxDQYCo&list=PLbMn3iuC3-SbLHKWFwcVHz3RNLw3clEUn&index=1",
        start: 5880,
        end: 5940,
        duration: 60,
        tags: ['#seinfeld', '#newman', '#hellonewman', '#jerry', '#jerryseinfeld', '#rivalry']
      },
      {
        id: 174,
        title: "Seinfeld - The Jerk Store Called",
        quote: "The Jerk Store Called",
        url: "https://www.youtube.com/watch?v=OfxEvW3jihI",
        start: 6120,
        end: 6360,
        duration: 240,
        tags: ['#seinfeld', '#jerkstore', '#jerkStorecalled', '#georgecostanza', '#jasonalexander', '#comeback']
      },
      {
        id: 175,
        title: "Friends - We Were on a Break",
        quote: "We Were on a Break",
        url: "https://www.youtube.com/watch?v=EGhHyaqZj40",
        start: 2940,
        end: 3060,
        duration: 120,
        tags: ['#friends', '#wewereOnabreak', '#rossandrachel', '#ross', '#davidschwimmer']
      },
      {
        id: 176,
        title: "Friends - PIVOT",
        quote: "PIVOT",
        url: "https://www.youtube.com/watch?v=8w3wmQAMoxQ",
        start: 5040,
        end: 5820,
        duration: 780,
        tags: ['#friends', '#pivot', '#rossgeller', '#davidschwimmer', '#couch']
      },
      {
        id: 177,
        title: "Friends - How You Doin\'",
        quote: "How You Doin\'",
        url: "https://www.youtube.com/watch?v=Iht75-LF7mE",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#friends', '#howyoudoin', '#joeytribbiani', '#mattleblanc', '#pickup']
      },
      {
        id: 178,
        title: "Friends - My Sandwich",
        quote: "My Sandwich",
        url: "https://www.youtube.com/watch?v=dYFevK2lDJI",
        start: 6180,
        end: 6600,
        duration: 420,
        tags: ['#friends', '#mysandwich', '#mymoistnmaker', '#rossgeller', '#davidschwimmer']
      },
      {
        id: 179,
        title: "Friends - Ross FINE",
        quote: "Ross FINE",
        url: "https://www.youtube.com/watch?v=NYLo7kvMRuI",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#friends', '#imfine', '#iamfine', '#rossgeller', '#davidschwimmer', '#margaritas']
      },
      {
        id: 180,
        title: "Friends - I KNOW!",
        quote: "I KNOW!",
        url: "https://www.youtube.com/watch?v=YXmgBKZaafw",
        start: 180,
        end: 300,
        duration: 120,
        tags: ['#friends', '#iknow', '#monicageller', '#courteneycox']
      },
      {
        id: 181,
        title: "Friends - Unagi",
        quote: "Unagi",
        url: "https://www.youtube.com/watch?v=UPW3iSLPrPg",
        start: 2640,
        end: 2760,
        duration: 120,
        tags: ['#friends', '#unagi', '#rossgeller', '#davidschwimmer', '#karate']
      },
      {
        id: 182,
        title: "Friends - Could I BE",
        quote: "Could I BE",
        url: "https://www.youtube.com/watch?v=wIbkReLYxOA",
        start: 4080,
        end: 4260,
        duration: 180,
        tags: ['#friends', '#couldibe', '#chandler', '#joeytribbiani', '#mattleblanc', '#impression']
      },
      {
        id: 183,
        title: "Friends - Joey Doesn\'t Share Food",
        quote: "Joey Doesn\'t Share Food",
        url: "https://www.youtube.com/watch?v=zQUO39j_c_k",
        start: 5520,
        end: 6120,
        duration: 600,
        tags: ['#friends', '#joeydoesntshare', '#joeydoesntshareFood', '#joeytribbiani', '#mattleblanc', '#food']
      },
      {
        id: 184,
        title: "Friends - Smelly Cat",
        quote: "Smelly Cat",
        url: "https://www.youtube.com/watch?v=Mkuw7vdi-VA",
        start: 600,
        end: 960,
        duration: 360,
        tags: ['#friends', '#smellycat', '#phoebebuffay', '#lisRakudrow', '#song']
      },
      {
        id: 185,
        title: "Iron Man - I Am Iron Man",
        quote: "I Am Iron Man",
        url: "https://www.youtube.com/watch?v=dD12aw5KYug",
        start: 480,
        end: 600,
        duration: 120,
        tags: ['#ironman', '#iamironman', '#tonystark', '#robertdowneyjr', '#reveal']
      },
      {
        id: 186,
        title: "Thor - Another!",
        quote: "Another!",
        url: "https://www.youtube.com/watch?v=Z-eBMw57RbY",
        start: 840,
        end: 1020,
        duration: 180,
        tags: ['#thor', '#another', '#chrishemsworth', '#coffee', '#smash', '#mug']
      },
      {
        id: 187,
        title: "Avengers Endgame - I Am Inevitable / I Am Iron Man",
        quote: "I Am Inevitable / I Am Iron Man",
        url: "https://www.youtube.com/watch?v=TWB31WFomz4",
        start: 3720,
        end: 4320,
        duration: 600,
        tags: ['#avengers', '#endgame', '#iaminevitable', '#iamironman', '#thanos', '#tonystark', '#snap']
      },
      {
        id: 188,
        title: "Avengers Endgame - Avengers Assemble",
        quote: "Avengers Assemble",
        url: "https://www.youtube.com/watch?v=afhf2-Rk4d8",
        start: 720,
        end: 1200,
        duration: 480,
        tags: ['#avengers', '#endgame', '#avengersassemble', '#captainamerica', '#chrisevans', '#portals']
      },
      {
        id: 189,
        title: "Captain America - I Can Do This All Day",
        quote: "I Can Do This All Day",
        url: "https://www.youtube.com/watch?v=IZnVoPw-fHw",
        start: 3780,
        end: 4080,
        duration: 300,
        tags: ['#captainamerica', '#icandothisallday', '#steverogers', '#chrisevans']
      },
      {
        id: 190,
        title: "Avengers - Hulk Smash Loki",
        quote: "Hulk Smash Loki",
        url: "https://www.youtube.com/watch?v=DtmY0hedXxY",
        start: 540,
        end: 840,
        duration: 300,
        tags: ['#avengers', '#hulksmash', '#hulk', '#loki', '#punygod']
      },
      {
        id: 191,
        title: "Avengers Infinity War - Mr Stark I Don\'t Feel So Good",
        quote: "Mr Stark I Don\'t Feel So Good",
        url: "https://www.youtube.com/watch?v=oRMvjv70FRw",
        start: 0,
        end: 600,
        duration: 600,
        tags: ['#avengers', '#infinitywar', '#mrStarkidontfeelsogood', '#idontfeelsogood', '#spiderman', '#tomholland', '#snap']
      },
      {
        id: 192,
        title: "Avengers Endgame - Portals Scene",
        quote: "Portals Scene",
        url: "https://www.youtube.com/watch?v=8gcRTMr-rlg",
        start: 9180,
        end: 9840,
        duration: 660,
        tags: ['#avengers', '#endgame', '#portals', '#avengersportals', '#epic']
      },
      {
        id: 193,
        title: "Thor Ragnarok - He\'s a Friend From Work",
        quote: "He\'s a Friend From Work",
        url: "https://www.youtube.com/watch?v=4gl3V5kUx6w",
        start: 4440,
        end: 4800,
        duration: 360,
        tags: ['#thor', '#ragnarok', '#friendfromwork', '#hulk', '#chrishemsworth', '#arena']
      },
      {
        id: 194,
        title: "Avengers - That\'s My Secret Cap",
        quote: "That\'s My Secret Cap",
        url: "https://www.youtube.com/watch?v=8mhadN-8oZE",
        start: 420,
        end: 840,
        duration: 420,
        tags: ['#avengers', '#thatsmysecret', '#alwaysangry', '#hulk', '#brucebanner', '#markruffalo']
      },
      {
        id: 195,
        title: "Spider-Man - With Great Power",
        quote: "With Great Power",
        url: "https://www.youtube.com/watch?v=guuYU74wU70",
        start: 4260,
        end: 4560,
        duration: 300,
        tags: ['#spiderman', '#withgreatpowercomes', '#greatresponsibility', '#unclebes']
      },
      {
        id: 196,
        title: "Black Panther - Wakanda Forever",
        quote: "Wakanda Forever",
        url: "https://www.youtube.com/watch?v=KZqaXisAm1I",
        start: 660,
        end: 840,
        duration: 180,
        tags: ['#blackpanther', '#wakandaforever', '#tchalla', '#chadwickboseman']
      },
      {
        id: 197,
        title: "Guardians of the Galaxy - I Am Groot",
        quote: "I Am Groot",
        url: "https://www.youtube.com/watch?v=c8pTIa0JQtM",
        start: 3480,
        end: 3600,
        duration: 120,
        tags: ['#guardiansofthegalaxy', '#iamgroot', '#wearegroot', '#groot', '#vindiesel', '#sacrifice']
      },
      {
        id: 198,
        title: "Avengers Endgame - Love You 3000",
        quote: "Love You 3000",
        url: "https://www.youtube.com/watch?v=__TQLDsyGw4",
        start: 8100,
        end: 8280,
        duration: 180,
        tags: ['#avengers', '#endgame', '#loveyou3000', '#tonystark', '#robertdowneyjr', '#morgan']
      },
      {
        id: 199,
        title: "Doctor Strange - Dormammu I\'ve Come to Bargain",
        quote: "Dormammu I\'ve Come to Bargain",
        url: "https://www.youtube.com/watch?v=LrHTR22pIhw",
        start: 1380,
        end: 1620,
        duration: 240,
        tags: ['#doctorstrange', '#dormammu', '#ivecomeTobargain', '#benedictcumberbatch', '#timeloop']
      },
      {
        id: 200,
        title: "Star Wars - I Am Your Father",
        quote: "I Am Your Father",
        url: "https://www.youtube.com/watch?v=_nSvn54WCxY",
        start: 4020,
        end: 4260,
        duration: 240,
        tags: ['#starwars', '#iamyourfather', '#darthvader', '#lukeskywalker', '#noooo', '#twist']
      },
      {
        id: 201,
        title: "Star Wars - Do or Do Not",
        quote: "Do or Do Not",
        url: "https://www.youtube.com/watch?v=BQ4yd2W50No",
        start: 1140,
        end: 1440,
        duration: 300,
        tags: ['#starwars', '#doordonot', '#thereisnotry', '#yoda', '#jedi', '#training']
      },
      {
        id: 202,
        title: "Star Wars - Hello There",
        quote: "Hello There",
        url: "https://www.youtube.com/watch?v=rEq1Z0bjdwc",
        start: 480,
        end: 600,
        duration: 120,
        tags: ['#starwars', '#hellothere', '#generalkenobi', '#obiwan', '#ewanmcgregor', '#meme', '#prequel']
      },
      {
        id: 203,
        title: "Star Wars - It\'s a Trap",
        quote: "It\'s a Trap",
        url: "https://www.youtube.com/watch?v=WlPTmXi0pVk",
        start: 3900,
        end: 4020,
        duration: 120,
        tags: ['#starwars', '#itsatrap', '#admiralackbar', '#meme']
      },
      {
        id: 204,
        title: "Star Wars - This Is The Way",
        quote: "This Is The Way",
        url: "https://www.youtube.com/watch?v=Fs72G3fIlog",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#starwars', '#thisistheway', '#mandalorian', '#mando', '#pedropascal']
      },
      {
        id: 205,
        title: "Star Wars - I Have the High Ground",
        quote: "I Have the High Ground",
        url: "https://www.youtube.com/watch?v=U8wLBOlCKPU",
        start: 0,
        end: 300,
        duration: 300,
        tags: ['#starwars', '#ihavethehighground', '#obiwan', '#anakin', '#ewanmcgregor', '#prequel']
      },
      {
        id: 206,
        title: "Star Wars - Nooooo",
        quote: "Nooooo",
        url: "https://www.youtube.com/watch?v=eJ04OLA7gm4",
        start: 120,
        end: 480,
        duration: 360,
        tags: ['#starwars', '#noooo', '#darthvader', '#padme', '#dramatic']
      },
      {
        id: 207,
        title: "Star Wars - I\'ve Got a Bad Feeling",
        quote: "I\'ve Got a Bad Feeling",
        url: "https://www.youtube.com/watch?v=4vcYarnszX0",
        start: 0,
        end: 300,
        duration: 300,
        tags: ['#starwars', '#badfeelingaboutthis', '#ivegotabadfeling', '#hansolo']
      },
      {
        id: 208,
        title: "Star Wars - May The Force Be With You",
        quote: "May The Force Be With You",
        url: "https://www.youtube.com/watch?v=pOVnogzqkXw",
        start: 1080,
        end: 1200,
        duration: 120,
        tags: ['#starwars', '#maytheforce', '#maytheforcebewithyou', '#jedi', '#blessing']
      },
      {
        id: 209,
        title: "Star Wars - Use The Force Luke",
        quote: "Use The Force Luke",
        url: "https://www.youtube.com/watch?v=6H0vFP_jXN4",
        start: 18000,
        end: 18240,
        duration: 240,
        tags: ['#starwars', '#usetheforce', '#obiwan', '#luke', '#jedi']
      },
      {
        id: 210,
        title: "Star Wars - Execute Order 66",
        quote: "Execute Order 66",
        url: "https://www.youtube.com/watch?v=wknirh8ijR0",
        start: 3240,
        end: 3780,
        duration: 540,
        tags: ['#starwars', '#order66', '#executeorder66', '#palpatine', '#emperor', '#clones']
      },
      {
        id: 211,
        title: "Star Wars - I Find Your Lack of Faith Disturbing",
        quote: "I Find Your Lack of Faith Disturbing",
        url: "https://www.youtube.com/watch?v=QNoo35bJexI",
        start: 6360,
        end: 6540,
        duration: 180,
        tags: ['#starwars', '#lackoffaith', '#yourlackoffaithdisturbs', '#darthvader', '#choke', '#force']
      },
      {
        id: 212,
        title: "Harry Potter - You\'re a Wizard Harry",
        quote: "You\'re a Wizard Harry",
        url: "https://www.youtube.com/watch?v=z9GwIeh5FIY",
        start: 6840,
        end: 6960,
        duration: 120,
        tags: ['#harrypotter', '#youreawizard', '#youreawizardharry', '#hagrid', '#robbiecoltrane', '#reveal']
      },
      {
        id: 213,
        title: "Harry Potter - Always",
        quote: "Always",
        url: "https://www.youtube.com/watch?v=LeG_judrcOA",
        start: 4380,
        end: 4860,
        duration: 480,
        tags: ['#harrypotter', '#always', '#snape', '#alanrickman', '#afterallthisTime', '#lily']
      },
      {
        id: 214,
        title: "Harry Potter - After All This Time",
        quote: "After All This Time",
        url: "https://www.youtube.com/watch?v=LeG_judrcOA",
        start: 4380,
        end: 4860,
        duration: 480,
        tags: ['#harrypotter', '#afterallthistime', '#always', '#snape', '#alanrickman', '#dumbledore']
      },
      {
        id: 215,
        title: "Harry Potter - It\'s Leviosa",
        quote: "It\'s Leviosa",
        url: "https://www.youtube.com/watch?v=Qgr4dcsY-60",
        start: 600,
        end: 840,
        duration: 240,
        tags: ['#harrypotter', '#leviosa', '#itsleviosanotleviosar', '#hermione', '#emmawatson']
      },
      {
        id: 216,
        title: "Harry Potter - Expelliarmus",
        quote: "Expelliarmus",
        url: "https://www.youtube.com/watch?v=Kd9-Y-JDC_o",
        start: 840,
        end: 1020,
        duration: 180,
        tags: ['#harrypotter', '#expelliarmus', '#spell', '#harrypotter', '#danielradcliffe']
      },
      {
        id: 217,
        title: "Harry Potter - I Shouldn\'t Have Said That",
        quote: "I Shouldn\'t Have Said That",
        url: "https://www.youtube.com/watch?v=498HkRM77gg",
        start: 540,
        end: 600,
        duration: 60,
        tags: ['#harrypotter', '#ishoudnothavesaidthat', '#hagrid', '#robbiecoltrane', '#oops']
      },
      {
        id: 218,
        title: "Harry Potter - Dobby Is Free",
        quote: "Dobby Is Free",
        url: "https://www.youtube.com/watch?v=8DTb-lseCdQ",
        start: 3660,
        end: 3900,
        duration: 240,
        tags: ['#harrypotter', '#dobbyisfree', '#dobby', '#sock', '#elf', '#freedom']
      },
      {
        id: 219,
        title: "Harry Potter - 10 Points to Gryffindor",
        quote: "10 Points to Gryffindor",
        url: "https://www.youtube.com/watch?v=IGrvPFCQ6K8",
        start: 10560,
        end: 10860,
        duration: 300,
        tags: ['#harrypotter', '#10pointstogryffindor', '#gryffindor', '#dumbledore', '#points']
      },
      {
        id: 220,
        title: "Forrest Gump - Run Forrest Run",
        quote: "Run Forrest Run",
        url: "https://www.youtube.com/watch?v=bSMxl1V8FSg",
        start: 1380,
        end: 1560,
        duration: 180,
        tags: ['#forrestgump', '#runforrestrun', '#tomhanks', '#jenny', '#running']
      },
      {
        id: 221,
        title: "Forrest Gump - Box of Chocolates",
        quote: "Box of Chocolates",
        url: "https://www.youtube.com/watch?v=vdtqSaJO-iM",
        start: 1980,
        end: 2580,
        duration: 600,
        tags: ['#forrestgump', '#boxofchocolates', '#lifeis', '#lifeislikeaboxofchocolates', '#tomhanks']
      },
      {
        id: 222,
        title: "Forrest Gump - I Am Not a Smart Man",
        quote: "I Am Not a Smart Man",
        url: "https://www.youtube.com/watch?v=UMmgZA5nlrE",
        start: 3780,
        end: 3960,
        duration: 180,
        tags: ['#forrestgump', '#iamnotasmartman', '#tomhanks', '#jenny', '#love']
      },
      {
        id: 223,
        title: "Forrest Gump - That\'s All I Have to Say",
        quote: "That\'s All I Have to Say",
        url: "https://www.youtube.com/watch?v=7-Yr1nQ3dFI",
        start: 0,
        end: 360,
        duration: 360,
        tags: ['#forrestgump', '#thatsallihavetosay', '#tomhanks', '#dropping', '#mic']
      },
      {
        id: 224,
        title: "Forrest Gump - Lt Dan Ice Cream",
        quote: "Lt Dan Ice Cream",
        url: "https://www.youtube.com/watch?v=1sY7umyLACw",
        start: 2760,
        end: 3540,
        duration: 780,
        tags: ['#forrestgump', '#ltdan', '#icecream', '#tomhanks', '#garysinise', '#shrimp']
      },
      {
        id: 225,
        title: "Forrest Gump - And Just Like That",
        quote: "And Just Like That",
        url: "https://www.youtube.com/watch?v=zS63_mWbkpg",
        start: 1020,
        end: 1380,
        duration: 360,
        tags: ['#forrestgump', '#andjustlikethat', '#justlikethat', '#tomhanks', '#jenny']
      },
      {
        id: 226,
        title: "The Dark Knight - Why So Serious",
        quote: "Why So Serious",
        url: "https://www.youtube.com/watch?v=PoyejjJGajk",
        start: 4320,
        end: 4500,
        duration: 180,
        tags: ['#darkknight', '#whysoserious', '#joker', '#heathledger', '#batman']
      },
      {
        id: 227,
        title: "The Dark Knight - Die a Hero or Live a Villain",
        quote: "Die a Hero or Live a Villain",
        url: "https://www.youtube.com/watch?v=8WfRcnF4iZI",
        start: 5640,
        end: 5940,
        duration: 300,
        tags: ['#darkknight', '#dieahero', '#youeitherdiehero', '#livevillain', '#harveydent', '#aaroneckhart']
      },
      {
        id: 228,
        title: "The Dark Knight - Some Men Just Want to Watch",
        quote: "Some Men Just Want to Watch",
        url: "https://www.youtube.com/watch?v=SIYkhb2NjfE",
        start: 4620,
        end: 4860,
        duration: 240,
        tags: ['#darkknight', '#watchtheworldburn', '#somemenJustwanttowatchtheworldburn', '#alfred', '#michaelcaine']
      },
      {
        id: 229,
        title: "The Dark Knight - Joker Clapping",
        quote: "Joker Clapping",
        url: "https://www.youtube.com/watch?v=Alk2ixHGLto",
        start: 3360,
        end: 3540,
        duration: 180,
        tags: ['#darkknight', '#jokerclapping', '#slowclap', '#heathledger', '#jail', '#meme']
      },
      {
        id: 230,
        title: "The Dark Knight - I\'m Like a Dog Chasing Cars",
        quote: "I\'m Like a Dog Chasing Cars",
        url: "https://www.youtube.com/watch?v=NWeh4A600E0",
        start: 2520,
        end: 2760,
        duration: 240,
        tags: ['#darkknight', '#dogchasingcars', '#ifiisawhimihihateit', '#joker', '#heathledger', '#chaos']
      },
      {
        id: 231,
        title: "The Dark Knight Rises - You Merely Adopted the Dark",
        quote: "You Merely Adopted the Dark",
        url: "https://www.youtube.com/watch?v=bpmNgPzklmQ",
        start: 4140,
        end: 4500,
        duration: 360,
        tags: ['#darkknightrises', '#borninithedark', '#youmerelyadoptedthedark', '#bane', '#tomhardy']
      },
      {
        id: 232,
        title: "Batman Begins - Why Do We Fall",
        quote: "Why Do We Fall",
        url: "https://www.youtube.com/watch?v=LstIgtkEe50",
        start: 1380,
        end: 1920,
        duration: 540,
        tags: ['#batmanbegins', '#whydowefall', '#sowecanlearnTopickourselves', '#thomaswayne', '#alfred', '#batman']
      },
      {
        id: 233,
        title: "The Dark Knight - This City Deserves a Better Class of Criminal",
        quote: "This City Deserves a Better Class of Criminal",
        url: "https://www.youtube.com/watch?v=jAgGqQDv32k",
        start: 12180,
        end: 12360,
        duration: 180,
        tags: ['#darkknight', '#betterclassofcriminal', '#joker', '#heathledger', '#gotham']
      },
      {
        id: 234,
        title: "Wolf of Wall Street - I\'m Not Leaving",
        quote: "I\'m Not Leaving",
        url: "https://www.youtube.com/watch?v=lzAwDUoZwfo",
        start: 18300,
        end: 18480,
        duration: 180,
        tags: ['#wolfofwallstreet', '#imnotleaving', '#jordanbelfort', '#leonardodicaprio', '#speech', '#defiant']
      },
      {
        id: 235,
        title: "Wolf of Wall Street - Those Are Rookie Numbers",
        quote: "Those Are Rookie Numbers",
        url: "https://www.youtube.com/watch?v=wM6exo00T5I",
        start: 12960,
        end: 13140,
        duration: 180,
        tags: ['#wolfofwallstreet', '#rookienumbers', '#pumpthemup', '#matthewmcconaughey', '#markHanna', '#meme']
      },
      {
        id: 236,
        title: "Wolf of Wall Street - Chest Thump",
        quote: "Chest Thump",
        url: "https://www.youtube.com/watch?v=gHjronXyeqI",
        start: 2400,
        end: 3900,
        duration: 1500,
        tags: ['#wolfofwallstreet', '#chestthump', '#matthewmcconaughey', '#hum', '#lunch', '#ritual']
      },
      {
        id: 237,
        title: "Wolf of Wall Street - Sell Me This Pen",
        quote: "Sell Me This Pen",
        url: "https://www.youtube.com/watch?v=nCfntaYBeqs",
        start: 960,
        end: 1140,
        duration: 180,
        tags: ['#wolfofwallstreet', '#sellmethispen', '#leonardodicaprio', '#jordanbelfort', '#sales', '#pen']
      },
      {
        id: 238,
        title: "Pulp Fiction - Say What Again",
        quote: "Say What Again",
        url: "https://www.youtube.com/watch?v=JE8xhfx4u58",
        start: 18300,
        end: 18780,
        duration: 480,
        tags: ['#pulpfiction', '#saywhatagain', '#idaredoubledare', '#samuelljackson', '#juleswinnfield', '#threat']
      },
      {
        id: 239,
        title: "Pulp Fiction - Royale With Cheese",
        quote: "Royale With Cheese",
        url: "https://www.youtube.com/watch?v=JE8xhfx4u58",
        start: 7680,
        end: 7920,
        duration: 240,
        tags: ['#pulpfiction', '#royalewithcheese', '#johntravolta', '#samuelljackson', '#paris', '#mcdonalds']
      },
      {
        id: 240,
        title: "Pulp Fiction - English Motherfucker",
        quote: "English Motherfucker",
        url: "https://www.youtube.com/watch?v=JE8xhfx4u58",
        start: 17760,
        end: 17880,
        duration: 120,
        tags: ['#pulpfiction', '#englishmotherfucker', '#samuelljackson', '#juleswinnfield', '#interrogation']
      },
      {
        id: 241,
        title: "Pulp Fiction - Dance Scene",
        quote: "Dance Scene",
        url: "https://www.youtube.com/watch?v=QYVc4v1gfgg",
        start: 5340,
        end: 6660,
        duration: 1320,
        tags: ['#pulpfiction', '#danceScene', '#johntravolta', '#umathurman', '#twist', '#restaurant']
      },
      {
        id: 242,
        title: "Pulp Fiction - Ezekiel 25:17",
        quote: "Ezekiel 25:17",
        url: "https://www.youtube.com/watch?v=x2WK_eWihdU",
        start: 3900,
        end: 6840,
        duration: 2940,
        tags: ['#pulpfiction', '#ezekiel', '#ezekiel2517', '#samuelljackson', '#juleswinnfield', '#biblequote', '#speech']
      },
      {
        id: 243,
        title: "Pulp Fiction - Uncomfortable Silence",
        quote: "Uncomfortable Silence",
        url: "https://www.youtube.com/watch?v=MWkN3akP3cU",
        start: 3000,
        end: 5760,
        duration: 2760,
        tags: ['#pulpfiction', '#uncomfortablesilence', '#umathurman', '#miawallace', '#dialogue']
      },
      {
        id: 244,
        title: "Princess Bride - Inconceivable",
        quote: "Inconceivable",
        url: "https://www.youtube.com/watch?v=dTRKCXC0JFg",
        start: 360,
        end: 840,
        duration: 480,
        tags: ['#princessbride', '#inconceivable', '#vizzini', '#wallaceshawn', '#idonothinkitmeanswhatyouthink']
      },
      {
        id: 245,
        title: "Princess Bride - As You Wish",
        quote: "As You Wish",
        url: "https://www.youtube.com/watch?v=niul8Hy-3wk",
        start: 8100,
        end: 8400,
        duration: 300,
        tags: ['#princessbride', '#asyouwish', '#westley', '#carlelwes', '#iloveyou', '#romantic']
      },
      {
        id: 246,
        title: "Princess Bride - My Name Is Inigo Montoya",
        quote: "My Name Is Inigo Montoya",
        url: "https://www.youtube.com/watch?v=I73sP93-0xA",
        start: 4560,
        end: 4920,
        duration: 360,
        tags: ['#princessbride', '#inigomontoya', '#mynameIsinigomontoya', '#mynameisinigomontoya', '#mandy patinkin', '#revenge', '#fencing']
      },
      {
        id: 247,
        title: "Princess Bride - Mostly Dead",
        quote: "Mostly Dead",
        url: "https://www.youtube.com/watch?v=d4ftmOI5NnI",
        start: 2580,
        end: 3000,
        duration: 420,
        tags: ['#princessbride', '#mostlydead', '#miraclemax', '#billycrystal', '#medicine']
      },
      {
        id: 248,
        title: "Princess Bride - Mawwiage",
        quote: "Mawwiage",
        url: "https://www.youtube.com/watch?v=3odMTPuzLwY",
        start: 1380,
        end: 1560,
        duration: 180,
        tags: ['#princessbride', '#mawwiage', '#mawwiagebwingsustogetha', '#weddingspeech', '#lisp']
      },
      {
        id: 249,
        title: "Game of Thrones - Shame Shame Shame",
        quote: "Shame Shame Shame",
        url: "https://www.youtube.com/watch?v=1GiPcP30cFc",
        start: 120,
        end: 480,
        duration: 360,
        tags: ['#gameofthrones', '#shame', '#cersei', '#walkofshame', '#bellshame', '#lena headey']
      },
      {
        id: 250,
        title: "Game of Thrones - I Drink and I Know Things",
        quote: "I Drink and I Know Things",
        url: "https://www.youtube.com/watch?v=55-B_EICis8",
        start: 1320,
        end: 1560,
        duration: 240,
        tags: ['#gameofthrones', '#idrinkandiknoethings', '#idrinkandiknoethings', '#tyrion', '#peterdinklage', '#wine']
      },
      {
        id: 251,
        title: "Game of Thrones - The Things I Do For Love",
        quote: "The Things I Do For Love",
        url: "https://www.youtube.com/watch?v=mmJ_KQLD0mI",
        start: 7380,
        end: 7620,
        duration: 240,
        tags: ['#gameofthrones', '#thethingsidoforlove', '#jaime', '#nikolajcosterwaldau', '#bran', '#push']
      },
      {
        id: 252,
        title: "Game of Thrones - Tell Cersei It Was Me",
        quote: "Tell Cersei It Was Me",
        url: "https://www.youtube.com/watch?v=8ToP_EnAlLU",
        start: 17280,
        end: 17520,
        duration: 240,
        tags: ['#gameofthrones', '#tellcersei', '#tellcerseiItwasme', '#olenna', '#olennaTyrell', '#dianaRigg', '#poison', '#savage']
      },
      {
        id: 253,
        title: "Game of Thrones - Winter Is Coming",
        quote: "Winter Is Coming",
        url: "https://www.youtube.com/watch?v=KZTjcxjz_8U",
        start: 1680,
        end: 1860,
        duration: 180,
        tags: ['#gameofthrones', '#winteriscoming', '#nedstark', '#seanbean', '#stark']
      },
      {
        id: 254,
        title: "Game of Thrones - You Know Nothing Jon Snow",
        quote: "You Know Nothing Jon Snow",
        url: "https://www.youtube.com/watch?v=fKgCgnLl8k8",
        start: 420,
        end: 780,
        duration: 360,
        tags: ['#gameofthrones', '#youknownothingjonsnow', '#ygritte', '#jonsnow', '#roseleslie']
      },
      {
        id: 255,
        title: "Game of Thrones - A Lannister Always Pays His Debts",
        quote: "A Lannister Always Pays His Debts",
        url: "https://www.youtube.com/watch?v=WPjXPRNQopo",
        start: 0,
        end: 480,
        duration: 480,
        tags: ['#gameofthrones', '#lannisterpayshisdebts', '#alannisteralwayspayshisdebts', '#tyrion', '#peterdinklage']
      },
      {
        id: 256,
        title: "Game of Thrones - Hold the Door",
        quote: "Hold the Door",
        url: "https://www.youtube.com/watch?v=5DoBY8M_bCg",
        start: 2580,
        end: 2880,
        duration: 300,
        tags: ['#gameofthrones', '#holdthedoor', '#hodor', '#hodor', '#sacrifice', '#heartbreaking', '#reveal']
      },
      {
        id: 257,
        title: "Vine - Road Work Ahead",
        quote: "Road Work Ahead",
        url: "https://www.youtube.com/watch?v=9sPthPleEKo",
        start: 0,
        end: 360,
        duration: 360,
        tags: ['#vine', '#roadworkahead', '#drewgooden', '#pun', '#meme']
      },
      {
        id: 258,
        title: "Vine - And They Were Roommates",
        quote: "And They Were Roommates",
        url: "https://www.youtube.com/watch?v=S0iM3bkkpbI",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#vine', '#andtheywereroommates', '#whisper', '#shock', '#meme']
      },
      {
        id: 259,
        title: "Vine - Two Bros Chillin in a Hot Tub",
        quote: "Two Bros Chillin in a Hot Tub",
        url: "https://www.youtube.com/watch?v=mydMr_qWqEs",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#vine', '#twobros', '#twobroschill', '#hottub', '#fivefeetapart', '#singing', '#meme']
      },
      {
        id: 260,
        title: "Vine - Look at All Those Chickens",
        quote: "Look at All Those Chickens",
        url: "https://www.youtube.com/watch?v=F-X4SLhorvw",
        start: 1560,
        end: 1800,
        duration: 240,
        tags: ['#vine', '#lookatallthosechickens', '#wrongbirds', '#pigeons', '#child', '#meme']
      },
      {
        id: 261,
        title: "Vine - Hi Welcome to Chili\'s",
        quote: "Hi Welcome to Chili\'s",
        url: "https://www.youtube.com/watch?v=ur78jQZqep4",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#vine', '#welcometochilis', '#hiwelcometochilis', '#meme']
      },
      {
        id: 262,
        title: "YouTube - It\'s Free Real Estate",
        quote: "It\'s Free Real Estate",
        url: "https://www.youtube.com/watch?v=IwBXKkvLirE&list=RDIwBXKkvLirE&start_radio=1",
        start: 660,
        end: 1020,
        duration: 360,
        tags: ['#youtube', '#freerealstate', '#itsfreerealstate', '#timanderic', '#meme']
      },
      {
        id: 263,
        title: "Internet - This Is Fine",
        quote: "This Is Fine",
        url: "https://www.youtube.com/watch?v=0oBx7Jg4m-o",
        start: 0,
        end: 780,
        duration: 780,
        tags: ['#thisisfine', '#thisisfinedog', '#dog', '#fire', '#denial', '#meme']
      },
      {
        id: 264,
        title: "YouTube - Ain\'t Nobody Got Time For That",
        quote: "Ain\'t Nobody Got Time For That",
        url: "https://www.youtube.com/watch?v=ydmPh4MXT3g",
        start: 1500,
        end: 1620,
        duration: 120,
        tags: ['#aintnobodygottimeforthat', '#sweetnbrown', '#meme', '#interview']
      },
      {
        id: 265,
        title: "YouTube - Hide Yo Kids",
        quote: "Hide Yo Kids",
        url: "https://www.youtube.com/watch?v=EzNhaLUT520",
        start: 4200,
        end: 4560,
        duration: 360,
        tags: ['#hideyokids', '#hideyowife', '#antoinedodson', '#meme', '#interview']
      },
      {
        id: 266,
        title: "YouTube - Surprised Pikachu",
        quote: "Surprised Pikachu",
        url: "https://www.youtube.com/watch?v=8LiiV7zACbI",
        start: 1440,
        end: 1500,
        duration: 60,
        tags: ['#surprisedpikachu', '#pikachu', '#pokemon', '#meme', '#reaction', '#shocked']
      },
      {
        id: 267,
        title: "YouTube - Bruh Sound Effect",
        quote: "Bruh Sound Effect",
        url: "https://www.youtube.com/watch?v=qBFLYizpb5I",
        start: 0,
        end: 0,
        duration: 3,
        tags: ['#bruh', '#bruhsoundeffect', '#meme', '#reaction']
      },
      {
        id: 268,
        title: "YouTube - Why You Always Lying",
        quote: "Why You Always Lying",
        url: "https://www.youtube.com/watch?v=WcWM_1hBu_c&list=RDWcWM_1hBu_c&start_radio=1",
        start: 0,
        end: 3900,
        duration: 3900,
        tags: ['#whyyoualwayslying', '#lying', '#meme', '#song']
      },
      {
        id: 269,
        title: "YouTube - Do It - Shia LaBeouf",
        quote: "Do It - Shia LaBeouf",
        url: "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
        start: 60,
        end: 420,
        duration: 360,
        tags: ['#justdoit', '#shialabeouf', '#doit', '#justdoit', '#motivational', '#meme']
      },
      {
        id: 270,
        title: "Scarface - Say Hello to My Little Friend",
        quote: "Say Hello to My Little Friend",
        url: "https://www.youtube.com/watch?v=9m_12SGXNKw",
        start: 900,
        end: 1380,
        duration: 480,
        tags: ['#scarface', '#sayhellotomylittlefriend', '#tonymontana', '#alpacino', '#gun']
      },
      {
        id: 271,
        title: "Terminator - I\'ll Be Back",
        quote: "I\'ll Be Back",
        url: "https://www.youtube.com/watch?v=I-9dthiJw-Q",
        start: 2220,
        end: 2340,
        duration: 120,
        tags: ['#terminator', '#illbeback', '#arnoldschwarzenegger', '#t800', '#threat', '#classic']
      },
      {
        id: 272,
        title: "Terminator 2 - Hasta La Vista Baby",
        quote: "Hasta La Vista Baby",
        url: "https://www.youtube.com/watch?v=zjx6hAUVAaU",
        start: 5100,
        end: 5340,
        duration: 240,
        tags: ['#terminator2', '#hastalavista', '#hastalavistababy', '#arnoldschwarzenegger', '#t800']
      },
      {
        id: 273,
        title: "Terminator 2 - Thumbs Up Sinking",
        quote: "Thumbs Up Sinking",
        url: "https://www.youtube.com/watch?v=hKppu7B-MT0",
        start: 300,
        end: 660,
        duration: 360,
        tags: ['#terminator2', '#thumbsup', '#lava', '#arnoldschwarzenegger', '#sacrifice']
      },
      {
        id: 274,
        title: "Jaws - You\'re Gonna Need a Bigger Boat",
        quote: "You\'re Gonna Need a Bigger Boat",
        url: "https://www.youtube.com/watch?v=2I91DJZKRxs",
        start: 1860,
        end: 2160,
        duration: 300,
        tags: ['#jaws', '#biggerboat', '#youreGonnaNeedaBiggerBoat', '#royscheider', '#shark']
      },
      {
        id: 275,
        title: "Titanic - I\'ll Never Let Go Jack",
        quote: "I\'ll Never Let Go Jack",
        url: "https://www.youtube.com/watch?v=9sErVyGeQrQ&list=RD9sErVyGeQrQ&start_radio=1",
        start: 7020,
        end: 7380,
        duration: 360,
        tags: ['#titanic', '#illneverletgo', '#rose', '#katewinslet', '#jack', '#ocean', '#cold']
      },
      {
        id: 276,
        title: "Jerry Maguire - Show Me the Money",
        quote: "Show Me the Money",
        url: "https://www.youtube.com/watch?v=IpwSXWq1wwU",
        start: 3480,
        end: 3660,
        duration: 180,
        tags: ['#jerrymaguire', '#showmethemoney', '#tomcruise', '#cubagoodingjr', '#phone']
      },
      {
        id: 277,
        title: "Hell\'s Kitchen - It\'s Raw",
        quote: "It\'s Raw",
        url: "https://www.youtube.com/watch?v=JsBRTEm6HlI",
        start: 2280,
        end: 2460,
        duration: 180,
        tags: ['#hellskitchen', '#itsraw', '#gordonramsay', '#cooking', '#angry']
      },
      {
        id: 278,
        title: "Hell\'s Kitchen - Idiot Sandwich",
        quote: "Idiot Sandwich",
        url: "https://www.youtube.com/watch?v=9AoIvLh-jVs",
        start: 600,
        end: 900,
        duration: 300,
        tags: ['#hellskitchen', '#idiotsandwich', '#gordonramsay', '#bread', '#meme', '#roast']
      },
      {
        id: 279,
        title: "Hell\'s Kitchen - Where\'s the Lamb Sauce",
        quote: "Where\'s the Lamb Sauce",
        url: "https://www.youtube.com/watch?v=zOXDcGq7Ohg",
        start: 7560,
        end: 7740,
        duration: 180,
        tags: ['#hellskitchen', '#wheresthelamSauce', '#lambsauce', '#gordonramsay', '#angry', '#meme']
      },
      {
        id: 280,
        title: "MasterChef - Finally Some Good Food",
        quote: "Finally Some Good Food",
        url: "https://www.youtube.com/watch?v=yWKeZe6ggJI",
        start: 240,
        end: 600,
        duration: 360,
        tags: ['#masterchef', '#finallysomegoodfood', '#gordonramsay', '#approval', '#meme']
      },
      {
        id: 281,
        title: "Hell\'s Kitchen - Donkey",
        quote: "Donkey",
        url: "https://www.youtube.com/watch?v=5N9p-OrBtsE",
        start: 360,
        end: 480,
        duration: 120,
        tags: ['#hellskitchen', '#donkey', '#gordonramsay', '#insult', '#angry']
      },
      {
        id: 282,
        title: "Hell\'s Kitchen - Get Out",
        quote: "Get Out",
        url: "https://www.youtube.com/watch?v=ghKzylo26v8",
        start: 35460,
        end: 35640,
        duration: 180,
        tags: ['#hellskitchen', '#getout', '#gordonramsay', '#kicked', '#elimination']
      },
      {
        id: 283,
        title: "MasterChef Junior - Gordon Being Nice to Kids",
        quote: "Gordon Being Nice to Kids",
        url: "https://www.youtube.com/watch?v=q4Dd1Njn-g0",
        start: 120,
        end: 240,
        duration: 120,
        tags: ['#masterchef', '#gordonramsay', '#nicetokids', '#wholesome', '#masterchefjunior']
      },
      {
        id: 284,
        title: "Succession - L to the OG",
        quote: "L to the OG",
        url: "https://www.youtube.com/watch?v=ote9AdFKKaA&list=RDote9AdFKKaA&start_radio=1",
        start: 3360,
        end: 3540,
        duration: 180,
        tags: ['#succession', '#ltotheog', '#kendallroy', '#jeremystrong', '#rap', '#cringe', '#birthday']
      },
      {
        id: 285,
        title: "Succession - Boar on the Floor",
        quote: "Boar on the Floor",
        url: "https://www.youtube.com/watch?v=dYqqW3c2mBU",
        start: 13800,
        end: 14700,
        duration: 900,
        tags: ['#succession', '#boaronthefloor', '#loganroy', '#brianCox', '#humiliation', '#power']
      },
      {
        id: 286,
        title: "Ted Lasso - Be Curious Not Judgmental",
        quote: "Be Curious Not Judgmental",
        url: "https://www.youtube.com/watch?v=CDRXv80F3Us",
        start: 9120,
        end: 9420,
        duration: 300,
        tags: ['#tedlasso', '#becurious', '#notjudgmental', '#jasonsudeikis', '#darts', '#wisdom']
      },
      {
        id: 287,
        title: "Ted Lasso - Believe",
        quote: "Believe",
        url: "https://www.youtube.com/watch?v=W6w6TZn4pus",
        start: 5220,
        end: 5520,
        duration: 300,
        tags: ['#tedlasso', '#believe', '#believesign', '#jasonsudeikis', '#optimism']
      },
      {
        id: 288,
        title: "Squid Game - Red Light Green Light",
        quote: "Red Light Green Light",
        url: "https://www.youtube.com/watch?v=N6Bn9-oKEOY",
        start: 900,
        end: 1560,
        duration: 660,
        tags: ['#squidgame', '#redlightgreenlight', '#doll', '#tense', '#scary', '#meme']
      },
      {
        id: 289,
        title: "Wednesday - Wednesday Dancing",
        quote: "Wednesday Dancing",
        url: "https://www.youtube.com/watch?v=NakTu_VZxJ0&list=RDNakTu_VZxJ0&start_radio=1",
        start: 2760,
        end: 2940,
        duration: 180,
        tags: ['#wednesday', '#wednesdaydancing', '#jennaortega', '#goth', '#viral', '#tiktok']
      },
      {
        id: 290,
        title: "Stranger Things - Running Up That Hill",
        quote: "Running Up That Hill",
        url: "https://www.youtube.com/watch?v=bV0zAcuG2Ao",
        start: 10320,
        end: 10920,
        duration: 600,
        tags: ['#strangerthings', '#runningupthathill', '#max', '#katebush', '#vecna', '#escape']
      },
      {
        id: 291,
        title: "Stranger Things - She\'s Our Friend and She\'s Crazy",
        quote: "She\'s Our Friend and She\'s Crazy",
        url: "https://www.youtube.com/watch?v=HlPe-9dDtIc",
        start: 8400,
        end: 8580,
        duration: 180,
        tags: ['#strangerthings', '#shesourfriend', '#ourfriendshescrazy', '#dustin', '#eleven']
      },
      {
        id: 292,
        title: "Breaking Bad - Say My Name",
        quote: "Say My Name",
        url: "https://www.youtube.com/watch?v=dy_DASt7hDs",
        start: 0,
        end: 900,
        duration: 900,
        tags: ['#breakingbad', '#saymyname', '#heisenberg', '#walterwhite', '#bryancranston']
      },
      {
        id: 293,
        title: "Breaking Bad - Jesse Screaming in Car",
        quote: "Jesse Screaming in Car",
        url: "https://www.youtube.com/watch?v=PTkU9f_AEF8",
        start: 480,
        end: 780,
        duration: 300,
        tags: ['#breakingbad', '#jesse', '#aaronpaul', '#screaming', '#breakdown', '#car']
      },
      {
        id: 294,
        title: "Better Call Saul - I Am Not Crazy",
        quote: "I Am Not Crazy",
        url: "https://www.youtube.com/watch?v=8RtOgIgDrvk",
        start: 240,
        end: 720,
        duration: 480,
        tags: ['#bettercallsaul', '#chicanery', '#iamnotcrazy', '#jimmymcgill', '#bobOdenkirk', '#court', '#speech']
      },
      {
        id: 295,
        title: "Bridesmaids - Help Me I\'m Poor",
        quote: "Help Me I\'m Poor",
        url: "https://www.youtube.com/watch?v=WNtS_HduSAM",
        start: 9960,
        end: 10080,
        duration: 120,
        tags: ['#bridesmaids', '#helpmeimpoor', '#kristenwiig', '#airplane', '#whisper', '#economy']
      },
      {
        id: 296,
        title: "Bridesmaids - It\'s Coming Out of Me Like Lava",
        quote: "It\'s Coming Out of Me Like Lava",
        url: "https://www.youtube.com/watch?v=EYhGg0wNTjc",
        start: 6780,
        end: 6900,
        duration: 120,
        tags: ['#bridesmaids', '#likelava', '#comingoutofmelikelava', '#melissamccarthy', '#foodpoisoning']
      },
      {
        id: 297,
        title: "Hangover - What Happens in Vegas",
        quote: "What Happens in Vegas",
        url: "https://www.youtube.com/watch?v=7mSyA1fGE9k",
        start: 0,
        end: 600,
        duration: 600,
        tags: ['#hangover', '#whathappensinvegas', '#zachgalifianakis', '#alan', '#roadtrip']
      },
      {
        id: 298,
        title: "Hangover - Did You Just Roofie Me",
        quote: "Did You Just Roofie Me",
        url: "https://www.youtube.com/watch?v=aE2s3kxKcvE",
        start: 2880,
        end: 3060,
        duration: 180,
        tags: ['#hangover', '#roofie', '#didyoujustroofieme', '#zachgalifianakis', '#alan', '#wolfpack']
      },
      {
        id: 299,
        title: "Hangover - One Man Wolf Pack",
        quote: "One Man Wolf Pack",
        url: "https://www.youtube.com/watch?v=fdMxRG9Jol0",
        start: 1920,
        end: 2100,
        duration: 180,
        tags: ['#hangover', '#wolfpack', '#onemanwolfpack', '#zachgalifianakis', '#alan']
      },
      {
        id: 300,
        title: "Mean Girls - On Wednesdays We Wear Pink",
        quote: "On Wednesdays We Wear Pink",
        url: "https://www.youtube.com/watch?v=fkfwrXgfRr4",
        start: 5040,
        end: 5100,
        duration: 60,
        tags: ['#meangirls', '#wednesdayswewear', '#onwednesdayswewear', '#pink', '#karensmith', '#amandaseyfriend']
      },
      {
        id: 301,
        title: "Mean Girls - She Doesn\'t Even Go Here",
        quote: "She Doesn\'t Even Go Here",
        url: "https://www.youtube.com/watch?v=qL7grOZhEjc",
        start: 12060,
        end: 12180,
        duration: 120,
        tags: ['#meangirls', '#doesntgohere', '#shedoesntevenngohere', '#damian']
      },
      {
        id: 302,
        title: "Mean Girls - Stop Trying to Make Fetch Happen",
        quote: "Stop Trying to Make Fetch Happen",
        url: "https://www.youtube.com/watch?v=Pubd-spHN-0",
        start: 120,
        end: 360,
        duration: 240,
        tags: ['#meangirls', '#fetch', '#stoptryingtomakefetch', '#reginageorge', '#rachelmcadams']
      },
      {
        id: 303,
        title: "Mean Girls - You Can\'t Sit With Us",
        quote: "You Can\'t Sit With Us",
        url: "https://www.youtube.com/watch?v=_bXSVc8lN7o",
        start: 1020,
        end: 1080,
        duration: 60,
        tags: ['#meangirls', '#cantsitWithus', '#youcantsitwithus', '#gretchen', '#lacychabert']
      },
      {
        id: 304,
        title: "Nacho Libre - Get That Corn Out of My Face",
        quote: "Get That Corn Out of My Face",
        url: "https://www.youtube.com/watch?v=MwCuxS6Ac24",
        start: 600,
        end: 900,
        duration: 300,
        tags: ['#nacholibre', '#corn', '#getthatcornoutofmyface', '#jackblack']
      },
      {
        id: 305,
        title: "Nacho Libre - Chancho",
        quote: "Chancho",
        url: "https://www.youtube.com/watch?v=zAvm4pqc9Go",
        start: 1020,
        end: 1560,
        duration: 540,
        tags: ['#nacholibre', '#chancho', '#stretchypants', '#jackblack', '#wrestling']
      },
      {
        id: 306,
        title: "Borat - Very Nice",
        quote: "Very Nice",
        url: "https://www.youtube.com/watch?v=X_XU7Uti21k",
        start: 4260,
        end: 4380,
        duration: 120,
        tags: ['#borat', '#verynice', '#greatsuccess', '#sachabaroncohen', '#meme']
      },
      {
        id: 307,
        title: "Borat - My Wife",
        quote: "My Wife",
        url: "https://www.youtube.com/watch?v=Zw16aew4Pt0",
        start: 0,
        end: 480,
        duration: 480,
        tags: ['#borat', '#mywife', '#sachabaroncohen', '#catchphrase']
      },
      {
        id: 308,
        title: "Napoleon Dynamite - Vote For Pedro",
        quote: "Vote For Pedro",
        url: "https://www.youtube.com/watch?v=kHL5iQJLvNU",
        start: 1980,
        end: 2100,
        duration: 120,
        tags: ['#napoleondynamite', '#voteforpedro', '#jonheder', '#napoleon', '#pedro']
      },
      {
        id: 309,
        title: "Napoleon Dynamite - Skills",
        quote: "Skills",
        url: "https://www.youtube.com/watch?v=XsiiIa6bs9I",
        start: 420,
        end: 1320,
        duration: 900,
        tags: ['#napoleondynamite', '#skills', '#nunchucks', '#bowstaff', '#jonheder', '#napoleon', '#advice']
      },
      {
        id: 310,
        title: "Napoleon Dynamite - Dance Scene",
        quote: "Dance Scene",
        url: "https://www.youtube.com/watch?v=WGdc92EOdm0&list=RDWGdc92EOdm0&start_radio=1",
        start: 900,
        end: 1980,
        duration: 1080,
        tags: ['#pulpfiction', '#danceScene', '#johntravolta', '#umathurman', '#twist', '#restaurant']
      },
      {
        id: 311,
        title: "Ace Ventura - Alrighty Then",
        quote: "Alrighty Then",
        url: "https://www.youtube.com/watch?v=BUsNLd9jgio",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#aceventura', '#alrightythen', '#jimcarrey', '#catchphrase']
      },
      {
        id: 312,
        title: "Ace Ventura - Do NOT Go In There",
        quote: "Do NOT Go In There",
        url: "https://www.youtube.com/watch?v=GUfS_2UGftg",
        start: 600,
        end: 900,
        duration: 300,
        tags: ['#aceventura', '#donotgoInthere', '#jimcarrey', '#bathroom', '#warning']
      },
      {
        id: 313,
        title: "Liar Liar - Stop Breaking the Law",
        quote: "Stop Breaking the Law",
        url: "https://www.youtube.com/watch?v=BJF-wVW1F2o",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#liarliar', '#stopbreakingthelaw', '#jimcarrey', '#lawyer', '#yelling', '#phone']
      },
      {
        id: 314,
        title: "The Big Lebowski - That\'s Just Like Your Opinion Man",
        quote: "That\'s Just Like Your Opinion Man",
        url: "https://www.youtube.com/watch?v=Z-xI1384Ry4",
        start: 4620,
        end: 4980,
        duration: 360,
        tags: ['#biglebowski', '#youropinion', '#justlikeyouropinionman', '#thedude', '#jeffbridges', '#dismissive']
      },
      {
        id: 315,
        title: "Any Given Sunday - Inches Speech",
        quote: "Inches Speech",
        url: "https://www.youtube.com/watch?v=oSDhhZtRwFU",
        start: 600,
        end: 1860,
        duration: 1260,
        tags: ['#anygivensunday', '#inches', '#InchesSpeech', '#alpacino', '#speech', '#football', '#lockerroom']
      },
      {
        id: 316,
        title: "Hoosiers - My Team Is on the Floor",
        quote: "My Team Is on the Floor",
        url: "https://www.youtube.com/watch?v=ITGwzan_0FY",
        start: 1320,
        end: 1680,
        duration: 360,
        tags: ['#hoosiers', '#myteam', '#myteamisonthefloor', '#genehackman', '#basketball', '#speech']
      },
      {
        id: 317,
        title: "Rudy - Rudy Gets Carried Off",
        quote: "Rudy Gets Carried Off",
        url: "https://www.youtube.com/watch?v=ZI63g64kDgY",
        start: 7380,
        end: 7740,
        duration: 360,
        tags: ['#rudy', '#rudygetscarriedoff', '#carriedoff', '#seanastin', '#football', '#notredame']
      },
      {
        id: 318,
        title: "Major League - Just a Bit Outside",
        quote: "Just a Bit Outside",
        url: "https://www.youtube.com/watch?v=g_wc9JvTXGc",
        start: 3180,
        end: 3360,
        duration: 180,
        tags: ['#majorleague', '#abitoutside', '#justabitoutside', '#bobuecker', '#baseball', '#commentary']
      },
      {
        id: 319,
        title: "Happy Gilmore - The Price Is Wrong",
        quote: "The Price Is Wrong",
        url: "https://www.youtube.com/watch?v=8QJiAK-s5a0",
        start: 8940,
        end: 9060,
        duration: 120,
        tags: ['#happygilmore', '#thepriceIswrong', '#priceIswrong', '#adamsandler', '#bBobbarker', '#fight']
      },
      {
        id: 320,
        title: "Happy Gilmore - You\'re Gonna Die Clown",
        quote: "You\'re Gonna Die Clown",
        url: "https://www.youtube.com/watch?v=mCQumUTzxVc",
        start: 2100,
        end: 2160,
        duration: 60,
        tags: ['#happygilmore', '#dieclown', '#youregonnadIeclown', '#adamsandler', '#clown', '#threat']
      },
      {
        id: 321,
        title: "Billy Madison - Everyone Is Now Dumber",
        quote: "Everyone Is Now Dumber",
        url: "https://www.youtube.com/watch?v=wKjxFJfcrcA",
        start: 1260,
        end: 1500,
        duration: 240,
        tags: ['#billymadison', '#everyoneisnowdumber', '#principal', '#speech', '#roast', '#adamsandler']
      },
      {
        id: 322,
        title: "Billy Madison - O\'Doyle Rules",
        quote: "O\'Doyle Rules",
        url: "https://www.youtube.com/watch?v=XVO3NJCPIoY",
        start: 2700,
        end: 3660,
        duration: 960,
        tags: ['#billymadison', '#odoyleRules', '#bully', '#adamsandler', '#chant']
      },
      {
        id: 323,
        title: "Waterboy - You Can Do It",
        quote: "You Can Do It",
        url: "https://www.youtube.com/watch?v=7WWoNgueWGw",
        start: 0,
        end: 360,
        duration: 360,
        tags: ['#waterboy', '#youcandoit', '#robschneider', '#adamsandler', '#encouragement']
      },
      {
        id: 324,
        title: "Waterboy - Mama Said",
        quote: "Mama Said",
        url: "https://www.youtube.com/watch?v=8OlNZL-TPbY",
        start: 0,
        end: 360,
        duration: 360,
        tags: ['#waterboy', '#mamasaid', '#bobbyboucher', '#adamsandler', '#mama', '#alligators']
      },
      {
        id: 325,
        title: "300 - This Is Sparta",
        quote: "This Is Sparta",
        url: "https://www.youtube.com/watch?v=4aof9KxIJZo",
        start: 1200,
        end: 1440,
        duration: 240,
        tags: ['#300', '#thisisparta', '#leonidas', '#gerardbutler', '#kick', '#well', '#sparta']
      },
      {
        id: 326,
        title: "300 - Tonight We Dine in Hell",
        quote: "Tonight We Dine in Hell",
        url: "https://www.youtube.com/watch?v=xgeiVgFP1BQ",
        start: 8220,
        end: 8520,
        duration: 300,
        tags: ['#300', '#tonightwedineinhell', '#leonidas', '#gerardbutler', '#battle']
      },
      {
        id: 327,
        title: "Joker - You Get What You Deserve",
        quote: "You Get What You Deserve",
        url: "https://www.youtube.com/watch?v=aZscBf10Y5A",
        start: 0,
        end: 180,
        duration: 180,
        tags: ['#joker', '#yougetwhatyoudeserve', '#arthurfleck', '#joaquinphoenix']
      },
      {
        id: 328,
        title: "Joker - I Used to Think My Life Was a Tragedy",
        quote: "I Used to Think My Life Was a Tragedy",
        url: "https://www.youtube.com/watch?v=4Wau3qa9PAk",
        start: 660,
        end: 1140,
        duration: 480,
        tags: ['#joker', '#tragedy', '#comedy', '#arthurfleck', '#joaquinphoenix', '#transformation']
      },
      {
        id: 329,
        title: "V for Vendetta - Remember Remember the 5th of November",
        quote: "Remember Remember the 5th of November",
        url: "https://www.youtube.com/watch?v=RS2HLC0sipA",
        start: 2400,
        end: 2640,
        duration: 240,
        tags: ['#vforvendetta', '#remember', '#rememberremember', '#5thofnovember', '#guyfawkes', '#mask']
      },
      {
        id: 330,
        title: "Fight Club - First Rule of Fight Club",
        quote: "First Rule of Fight Club",
        url: "https://www.youtube.com/watch?v=dC1yHLp9bWA",
        start: 780,
        end: 1020,
        duration: 240,
        tags: ['#fightclub', '#firstruleoffightclub', '#firstrule', '#bradpitt', '#tylerdurden']
      },
      {
        id: 331,
        title: "Fight Club - I Am Jack\'s Complete Lack of Surprise",
        quote: "I Am Jack\'s Complete Lack of Surprise",
        url: "https://www.youtube.com/watch?v=xhtrmebhqfw",
        start: 0,
        end: 240,
        duration: 240,
        tags: ['#fightclub', '#iamjacks', '#completelackofsurprise', '#edwardnorton', '#narrator']
      },
      {
        id: 332,
        title: "Interstellar - Murph Don\'t Let Me Leave",
        quote: "Murph Don\'t Let Me Leave",
        url: "https://www.youtube.com/watch?v=_ZnOfdpOEZQ",
        start: 360,
        end: 960,
        duration: 600,
        tags: ['#interstellar', '#murph', '#dontletmeleave', '#matthewmcconaughey', '#fatherdaughter', '#space']
      },
      {
        id: 333,
        title: "Interstellar - Come On TARS",
        quote: "Come On TARS",
        url: "https://www.youtube.com/watch?v=dWdxKx-v8E0",
        start: 4860,
        end: 5280,
        duration: 420,
        tags: ['#interstellar', '#tars', '#docking', '#matthewmcconaughey', '#impossible', '#space']
      },
      {
        id: 334,
        title: "Shrek - Somebody Once Told Me",
        quote: "Somebody Once Told Me",
        url: "https://www.youtube.com/watch?v=YikgAxa5KGw",
        start: 120,
        end: 420,
        duration: 300,
        tags: ['#shrek', '#somebodyoncetoldme', '#allstar', '#smashmouth', '#opening', '#meme']
      },
      {
        id: 335,
        title: "Shrek - Better Out Than In",
        quote: "Better Out Than In",
        url: "https://www.youtube.com/watch?v=pETJLTSPrJw",
        start: 240,
        end: 420,
        duration: 180,
        tags: ['#shrek', '#betterouthanin', '#shrek', '#mikeymyers', '#burp', '#fart', '#wisdom']
      },
      {
        id: 336,
        title: "Shrek - Donkey - Are We There Yet",
        quote: "Donkey - Are We There Yet",
        url: "https://www.youtube.com/watch?v=Gn51xYvJhQI",
        start: 1380,
        end: 1800,
        duration: 420,
        tags: ['#shrek', '#arewethereyet', '#donkey', '#eddiemurphy', '#annoying', '#roadtrip']
      },
      {
        id: 337,
        title: "Monty Python - Just a Flesh Wound",
        quote: "Just a Flesh Wound",
        url: "https://www.youtube.com/watch?v=UijhbHvxWrA",
        start: 4200,
        end: 4620,
        duration: 420,
        tags: ['#montypython', '#fleshwound', '#justaflesHwound', '#tisbutascratch', '#tisbutascratch', '#blackknight']
      },
      {
        id: 338,
        title: "Monty Python - Run Away",
        quote: "Run Away",
        url: "https://www.youtube.com/watch?v=MUG9VzHoEoc",
        start: 60,
        end: 360,
        duration: 300,
        tags: ['#montypython', '#runaway', '#holygrail', '#rabbit', '#retreat']
      },
      {
        id: 339,
        title: "Monty Python - Spanish Inquisition",
        quote: "Spanish Inquisition",
        url: "https://www.youtube.com/watch?v=psMMKgvpGfg",
        start: 0,
        end: 480,
        duration: 480,
        tags: ['#montypython', '#spanishinquisition', '#nobodyexpectsthespanishinquisition', '#nobody', '#expects']
      }
  ];

  // ── CATEGORIES ──
  const categories = [
    { id: 'funny', label: 'Comedy', icon: 'Laugh', color: 'from-amber-500 to-orange-500', keywords: ['funny', 'absurd', 'comedy', 'awkward', 'hilarious', 'wtf', 'roast', 'sarcastic'] },
    { id: 'epic', label: 'Epic', icon: 'Swords', color: 'from-red-500 to-rose-600', keywords: ['epic', 'badass', 'battle', 'intense', 'action', 'cool'] },
    { id: 'motivational', label: 'Hype', icon: 'Flame', color: 'from-emerald-500 to-teal-500', keywords: ['motivational', 'inspirational', 'speech', 'hype', 'perseverance'] },
    { id: 'emotional', label: 'Feels', icon: 'Heart', color: 'from-pink-500 to-rose-400', keywords: ['emotional', 'touching', 'wholesome', 'sad', 'love', 'friendship', 'crying'] },
    { id: 'iconic', label: 'Iconic', icon: 'Mic', color: 'from-violet-500 to-purple-600', keywords: ['iconic', 'meme', 'viral', 'legendary'] },
  ];

  const categoryIcons = { Laugh, Swords, Flame, Heart, Mic };

  // ── HELPERS ──
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const getYouTubeId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const getMovieName = (title) => title.split(' - ')[0] || title;
  const getSceneName = (title) => title.split(' - ')[1] || title;

  const buildTimestampUrl = (clip) => {
    return `${clip.url}${clip.url.includes('?') ? '&' : '?'}t=${clip.start}s`;
  };

  // ── FILTERING ──
  const filteredClips = useMemo(() => {
    let result = clips;
    
    if (activeCategory) {
      const cat = categories.find(c => c.id === activeCategory);
      if (cat) {
        result = result.filter(clip =>
          clip.tags.some(tag => cat.keywords.some(kw => tag.toLowerCase().includes(kw)))
        );
      }
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const searchNoSpaces = search.replace(/\s+/g, '');
      const searchWords = search.split(/\s+/).filter(w => w.length > 0);
      result = result.filter(clip => {
        const titleLower = clip.title.toLowerCase();
        const quoteLower = clip.quote.toLowerCase();
        const tagsJoined = clip.tags.join(' ').toLowerCase();
        const tagsNoSpaces = tagsJoined.replace(/\s+/g, '');
        // Match if: full phrase in title/quote, OR phrase-no-spaces in tags, OR all words appear somewhere
        return titleLower.includes(search) ||
          quoteLower.includes(search) ||
          tagsJoined.includes(search) ||
          tagsNoSpaces.includes(searchNoSpaces) ||
          searchWords.every(word => titleLower.includes(word) || quoteLower.includes(word) || tagsJoined.includes(word));
      });
    }
    
    return result;
  }, [searchTerm, activeCategory]);

  // ── ACTIONS ──
  const copyToClipboard = useCallback(async (clip) => {
    const timestampUrl = buildTimestampUrl(clip);
    try {
      await navigator.clipboard.writeText(timestampUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = timestampUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedId(clip.id);
    setJustCopiedToast(getSceneName(clip.title));
    setTimeout(() => setCopiedId(null), 2000);
    setTimeout(() => setJustCopiedToast(null), 2500);
  }, []);

  const getRandomClip = useCallback(() => {
    const pool = filteredClips.length > 0 ? filteredClips : clips;
    const clip = pool[Math.floor(Math.random() * pool.length)];
    setRandomClip(clip);
  }, [filteredClips]);

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory(null);
  };

  // ── SCROLL HANDLING ──
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── KEYBOARD SHORTCUTS ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && !isSearchFocused) { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'Escape') { searchRef.current?.blur(); setRandomClip(null); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchFocused]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        * { -webkit-tap-highlight-color: transparent; }
        .card-hover { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-2px); }
        .card-hover:active { transform: scale(0.98); }
        .toast-enter { animation: toastSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1), toastFade 0.4s ease 2.1s forwards; }
        @keyframes toastSlide { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes toastFade { to { opacity: 0; transform: translateY(-10px); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .pulse-ring { animation: pulseRing 2s ease-out infinite; }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(251, 146, 60, 0); } 100% { box-shadow: 0 0 0 0 rgba(251, 146, 60, 0); } }
        .modal-bg { animation: modalBgIn 0.2s ease; }
        @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-card { animation: modalCardIn 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes modalCardIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        input::placeholder { color: rgba(161, 161, 170, 0.6); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {justCopiedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 toast-enter">
          <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/25 text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>Copied! Ready to paste</span>
          </div>
        </div>
      )}

      {/* RANDOM CLIP MODAL */}
      {randomClip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-bg"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setRandomClip(null)}
        >
          <div className="modal-card max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden shadow-2xl">
              {getYouTubeId(randomClip.url) && (
                <a href={buildTimestampUrl(randomClip)} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-zinc-800 group">
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeId(randomClip.url)}/mqdefault.jpg`}
                    alt={randomClip.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://img.youtube.com/vi/${getYouTubeId(randomClip.url)}/hqdefault.jpg`; }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </a>
              )}
              <div className="p-5">
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">{getMovieName(randomClip.title)}</p>
                <h3 className="text-white text-lg font-bold mb-2">{getSceneName(randomClip.title)}</h3>
                <p className="text-zinc-400 text-sm italic mb-4 line-clamp-2">&ldquo;{randomClip.quote}&rdquo;</p>
                <div className="flex gap-2">
                  <button onClick={() => copyToClipboard(randomClip)} className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-semibold active:scale-95 ${copiedId === randomClip.id ? 'bg-emerald-500 text-white' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
                    {copiedId === randomClip.id ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
                  </button>
                  <button onClick={() => { setRandomClip(null); setTimeout(getRandomClip, 50); }} className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm">
                    <Shuffle className="w-4 h-4" /> Next
                  </button>
                  <button onClick={() => setRandomClip(null)} className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white px-3 py-2.5 rounded-xl transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── HERO: Google-style. Big logo up top, search bar at thumb level ── */}
        <div className={`flex flex-col items-center transition-all duration-300`} style={{ minHeight: (searchTerm || activeCategory) ? 'auto' : '92vh', justifyContent: (searchTerm || activeCategory) ? 'flex-start' : 'center', paddingTop: (searchTerm || activeCategory) ? '20px' : '0', paddingBottom: (searchTerm || activeCategory) ? '0' : '0' }}>

          {/* Logo — LARGE on landing like Google, compact when searching */}
          <div className={`inline-flex items-center transition-all duration-300 ${(searchTerm || activeCategory) ? 'gap-2 mb-3' : 'gap-3 mb-4 sm:mb-5'}`}>
            <div className={`rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-300 ${(searchTerm || activeCategory) ? 'w-6 h-6 rounded-lg' : 'w-12 h-12 sm:w-16 sm:h-16'}`}>
              <Clapperboard className={`text-white transition-all duration-300 ${(searchTerm || activeCategory) ? 'w-3 h-3' : 'w-6 h-6 sm:w-8 sm:h-8'}`} />
            </div>
            <h1 className={`font-bold tracking-tight transition-all duration-300 ${(searchTerm || activeCategory) ? 'text-base sm:text-xl' : 'text-4xl sm:text-6xl'}`}>Find<span className="text-orange-400">Scene</span>Clips</h1>
          </div>

          {/* Tagline — visible only on landing, sized between logo and search */}
          {!(searchTerm || activeCategory) && (
            <div className="text-center mb-8 sm:mb-10 fade-in">
              <p className="text-white text-xl sm:text-2xl font-bold leading-tight mb-2 sm:mb-3">
                Better than GIFs!
              </p>
              <p className="text-zinc-400 text-base sm:text-xl leading-relaxed max-w-sm sm:max-w-lg mx-auto">
                Search iconic media moments.<br />Copy the video hyperlink and text it to your friends.
              </p>
            </div>
          )}

          {/* SEARCH BAR — the main action */}
          <div className={`relative w-full max-w-xl transition-all duration-300 ${(searchTerm || activeCategory) ? 'mb-3' : 'mb-4 sm:mb-5'}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              placeholder='Try "you shall not pass" or "Will Ferrell"'
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-12 pr-12 py-4 sm:py-4.5 bg-zinc-900 border-2 border-zinc-700 rounded-2xl text-white text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all placeholder:text-zinc-600"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
            {!searchTerm && !isSearchFocused && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 text-xs font-mono hidden sm:block">/</span>
            )}
          </div>

          {/* CATEGORY + SURPRISE */}
          <div className={`w-full max-w-xl transition-all duration-300 ${(searchTerm || activeCategory) ? 'mb-2' : 'mb-0'}`}>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 justify-center flex-wrap">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.icon];
                const isActive = activeCategory === cat.id;
                return (
                  <button key={cat.id} onClick={() => { setActiveCategory(isActive ? null : cat.id); }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 whitespace-nowrap ${isActive ? `bg-gradient-to-r ${cat.color} text-white shadow-lg` : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'}`}>
                    <Icon className="w-3 h-3" />
                    {cat.label}
                  </button>
                );
              })}
              <button onClick={getRandomClip}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-all active:scale-95 whitespace-nowrap pulse-ring">
                <Shuffle className="w-3 h-3" /> Surprise Me
              </button>
            </div>
          </div>

          {/* RESULT COUNT — only when searching */}
          {(searchTerm || activeCategory) && (
            <div className="text-center mb-2 mt-1 fade-in">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-zinc-500">{filteredClips.length} {filteredClips.length === 1 ? 'clip' : 'clips'}</span>
                <button onClick={clearFilters} className="text-orange-400 hover:text-orange-300 font-medium transition-colors">Clear</button>
              </div>
            </div>
          )}
        </div>

        {/* CLIPS GRID — only visible when user searches or picks a category */}
        {(searchTerm || activeCategory) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 pb-8 fade-in">
            {filteredClips.map((clip) => {
              const videoId = getYouTubeId(clip.url);
              const isCopied = copiedId === clip.id;
              return (
                <div key={clip.id} className="card-hover bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 group">
                  {videoId && (
                    <a href={buildTimestampUrl(clip)} target="_blank" rel="noopener noreferrer" className="block relative bg-zinc-800" style={{ aspectRatio: '16/10' }}>
                      <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={clip.title} className="w-full h-full object-cover" loading="lazy"
                        onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <div className="absolute top-1.5 right-1.5 bg-black/70 px-1.5 py-0.5 rounded text-white text-[10px] sm:text-xs flex items-center gap-0.5 font-mono">
                        {formatDuration(clip.duration)}
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 right-1.5">
                        <p className="text-orange-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wide drop-shadow-lg leading-none mb-0.5">{getMovieName(clip.title)}</p>
                        <p className="text-white text-xs sm:text-sm font-semibold leading-tight drop-shadow-lg line-clamp-1">{getSceneName(clip.title)}</p>
                      </div>
                    </a>
                  )}
                  <div className="p-2 sm:p-3">
                    <p className="text-zinc-500 text-[11px] sm:text-xs italic mb-2 line-clamp-2 leading-snug">&ldquo;{clip.quote}&rdquo;</p>
                    <button onClick={() => copyToClipboard(clip)}
                      className={`w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs sm:text-sm font-semibold active:scale-95 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}>
                      {isCopied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* NO RESULTS */}
        {(searchTerm || activeCategory) && filteredClips.length === 0 && (
          <div className="text-center py-16 fade-in">
            <div className="text-4xl mb-3">{'\u{1F3AC}'}</div>
            <p className="text-zinc-400 text-lg mb-1">No clips match that search</p>
            <p className="text-zinc-600 text-sm mb-4">Try a different movie, quote, or emotion</p>
            <button onClick={clearFilters} className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">Clear search</button>
          </div>
        )}

        {/* FOOTER — only when results are showing */}
        {(searchTerm || activeCategory) && filteredClips.length > 0 && (
          <div className="text-center py-8 border-t border-zinc-900">
            <p className="text-zinc-600 text-xs sm:text-sm">{clips.length} iconic moments and counting</p>
            <p className="text-zinc-700 text-xs mt-1">FindSceneClips.com</p>
          </div>
        )}
      </div>

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 fade-in">
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default App;

