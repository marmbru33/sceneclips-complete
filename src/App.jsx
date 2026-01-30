import React, { useState, useMemo } from 'react';
import { Search, Copy, Play, Share2, Clock, Film } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  const clips = [
    {
      id: 1,
      title: "Braveheart - Freedom Speech",
      quote: "They may take our lives, but they'll never take our freedom!",
      url: "https://www.youtube.com/watch?v=h2vW-rr9ibE",
      start: 297,
      end: 325,
      duration: 28,
      tags: ['#braveheart', '#williamwallace', '#melgibson', '#freedom', '#theymighttakeourfreedom', '#nevertakeourfreedom', '#scotland', '#speech', '#hype', '#motivational', '#epic', '#battle', '#inspirational', '#freespeech']
    },
    {
      id: 2,
      title: "Gladiator - My Name is Maximus",
      quote: "My name is Maximus Decimus Meridius, commander of the armies of the north, general of the Felix legions, loyal servant to the true emperor Marcus Aurelius, father to a murdered son, husband to a murdered wife, and I will have my vengeance in this life or the next",
      url: "https://www.youtube.com/watch?v=lEM5nJ-AUiM",
      start: 36,
      end: 138,
      duration: 102,
      tags: ['#gladiator', '#maximus', '#mynameismaximus', '#maximusdecimusmeridius', '#russellcrowe', '#vengeance', '#iwillhavemyvengeance', '#badass', '#epic', '#colosseum', '#rome', '#fathertoamurderedson', '#husbandtoamurderedwife', '#commanderofthearmies']
    },
    {
      id: 3,
      title: "Gladiator - What We Do in Life Echoes in Eternity",
      quote: "Brothers, what we do in life echoes in eternity",
      url: "https://www.youtube.com/watch?v=CDpTc32sV1Y",
      start: 52,
      end: 60,
      duration: 8,
      tags: ['#gladiator', '#maximus', '#echoesinenternity', '#whatwedoinlife', '#brothers', '#motivational', '#epic', '#speech', '#philosophy', '#battle', '#inspirational', '#eternity']
    },
    {
      id: 4,
      title: "Gladiator - I Will See You Again",
      quote: "I will see you again one day my friend, but not yet, not yet",
      url: "https://www.youtube.com/watch?v=FRgp2v9Km9M",
      start: 14,
      end: 28,
      duration: 14,
      tags: ['#gladiator', '#maximus', '#iwillseeyouagain', '#notyet', '#emotional', '#touching', '#afterlife', '#family', '#goodbye']
    },
    {
      id: 5,
      title: "Gladiator - Shadows and Dust",
      quote: "We mortals are but shadows and dust, shadows and dust Maximus",
      url: "https://www.youtube.com/watch?v=5Z6EvBFblvg",
      start: 4,
      end: 21,
      duration: 17,
      tags: ['#gladiator', '#proximo', '#shadowsanddust', '#wemortals', '#philosophy', '#mortality', '#death']
    },
    {
      id: 6,
      title: "Gladiator - Are You Not Entertained",
      quote: "Are you not entertained?! Are you not entertained?! Is this not why you are here?!",
      url: "https://www.youtube.com/watch?v=HmdpjkM3onk",
      start: 72,
      end: 84,
      duration: 12,
      tags: ['#gladiator', '#maximus', '#areyounotentertained', '#colosseum', '#badass', '#iconic', '#defiance', '#crowd', '#anger']
    },
    {
      id: 7,
      title: "Gladiator - Busy Little Bee",
      quote: "Busy little bee, aren't you",
      url: "https://www.youtube.com/watch?v=B5offaJujB0",
      start: 67,
      end: 76,
      duration: 9,
      tags: ['#gladiator', '#commodus', '#busylittlebee', '#joaquinphoenix', '#sarcastic', '#threatening', '#villain']
    },
    {
      id: 8,
      title: "Gladiator - Walking Through Field",
      quote: "Elysium - Maximus walking through golden wheat fields",
      url: "https://www.youtube.com/watch?v=enGTk409iQk",
      start: 0,
      end: 15,
      duration: 15,
      tags: ['#gladiator', '#maximus', '#elysium', '#afterlife', '#peaceful', '#heaven', '#fields', '#dream', '#wheat', '#paradise']
    },
    {
      id: 9,
      title: "Rocky Balboa - Talking to Son",
      quote: "It ain't about how hard you hit, it's about how hard you can get hit and keep moving forward",
      url: "https://www.youtube.com/watch?v=vJHkTtvnUqA",
      start: 32,
      end: 44,
      duration: 12,
      tags: ['#rocky', '#rockybalboa', '#sylvesterstallone', '#motivational', '#advice', '#keepmoving', '#itsnotabouthowhard', '#life', '#perseverance', '#son', '#father', '#speech']
    },
    {
      id: 10,
      title: "Rocky - Training Montage",
      quote: "Gonna fly now - iconic Rocky training montage with stairs",
      url: "https://www.youtube.com/watch?v=_YYmfM2TfUA",
      start: 0,
      end: 160,
      duration: 160,
      tags: ['#rocky', '#training', '#montage', '#gonnaflytnow', '#motivational', '#hype', '#philadelphia', '#stairs', '#boxing', '#workout', '#inspiration']
    },
    {
      id: 11,
      title: "Rocky IV - If He Dies He Dies",
      quote: "If he dies, he dies",
      url: "https://www.youtube.com/watch?v=WvAeWtyZ-uE",
      start: 31,
      end: 35,
      duration: 4,
      tags: ['#rocky', '#rocky4', '#ivandrago', '#ifhedies', '#cold', '#ruthless', '#dolphlundgren', '#villain', '#ussr']
    },
    {
      id: 12,
      title: "Coach Carter - Our Deepest Fear",
      quote: "Our deepest fear is not that we are inadequate, our deepest fear is that we are powerful beyond measure",
      url: "https://www.youtube.com/watch?v=2_fDhqRk_Ro",
      start: 39,
      end: 93,
      duration: 54,
      tags: ['#coachcarter', '#ourdeepestfear', '#motivational', '#speech', '#inspirational', '#mariannewilliamson', '#samuelljackson', '#powerful', '#poetry']
    },
    {
      id: 13,
      title: "Friday Night Lights - Perfection Speech",
      quote: "Being perfect is not about that scoreboard out there, it's about you and your relationship with yourself and your family",
      url: "https://www.youtube.com/watch?v=o-iPiN_YHjY",
      start: 45,
      end: 88,
      duration: 43,
      tags: ['#fridaynightlights', '#perfection', '#speech', '#motivational', '#football', '#billybobthornton', '#beingperfect', '#relationship', '#locker room']
    },
    {
      id: 14,
      title: "Friday Night Lights - Clear Eyes Full Hearts",
      quote: "Clear eyes, full hearts, can't lose",
      url: "https://www.youtube.com/watch?v=fQPe4RigYmg",
      start: 50,
      end: 60,
      duration: 10,
      tags: ['#fridaynightlights', '#cleareyes', '#fullhearts', '#cantlose', '#chant', '#football', '#hype', '#rally', '#team', '#motto']
    },
    {
      id: 15,
      title: "Anchorman - 60% of the Time",
      quote: "60% of the time, it works every time",
      url: "https://www.youtube.com/watch?v=pjvQFtlNQ-M",
      start: 0,
      end: 30,
      duration: 30,
      tags: ['#anchorman', '#sexpanther', '#60percent', '#willferrell', '#brianfantana', '#paulrudd', '#funny', '#absurd', '#cologne', '#ronburgundy', '#workseverytime']
    },
    {
      id: 16,
      title: "Anchorman - It's the Pleats",
      quote: "Don't act like you're not impressed",
      url: "https://www.youtube.com/watch?v=OpiUeC7JPdA",
      start: 20,
      end: 49,
      duration: 29,
      tags: ['#anchorman', '#itsthepleats', '#ronburgundy', '#willferrell', '#dontactlike', '#notimpressed', '#funny', '#cocky', '#impressed', '#erection']
    },
    {
      id: 17,
      title: "Anchorman - That Escalated Quickly",
      quote: "Boy, that escalated quickly, I mean that really got out of hand fast",
      url: "https://www.youtube.com/watch?v=bFWQYMdMIPQ",
      start: 0,
      end: 15,
      duration: 15,
      tags: ['#anchorman', '#thatescalatedquickly', '#ronburgundy', '#willferrell', '#funny', '#reaction', '#chaos', '#outofhand']
    },
    {
      id: 18,
      title: "Step Brothers - Did We Just Become Best Friends (Full)",
      quote: "Did we just become best friends? Yep! Do you wanna go do karate in the garage? Yep!",
      url: "https://www.youtube.com/watch?v=pYq9g8aqRTM",
      start: 98,
      end: 125,
      duration: 27,
      tags: ['#stepbrothers', '#bestfriends', '#didwejust', '#willferrell', '#johncreilly', '#karate', '#garage', '#funny', '#wholesome', '#friendship', '#full', '#bonding']
    },
    {
      id: 19,
      title: "Step Brothers - Did We Just Become Best Friends (Short)",
      quote: "Did we just become best friends? YEP!",
      url: "https://www.youtube.com/watch?v=pYq9g8aqRTM",
      start: 117,
      end: 125,
      duration: 8,
      tags: ['#stepbrothers', '#bestfriends', '#yep', '#willferrell', '#johncreilly', '#funny', '#short', '#friendship']
    },
    {
      id: 20,
      title: "Step Brothers - The Catalina Wine Mixer",
      quote: "The fucking Catalina Wine Mixer!",
      url: "https://www.youtube.com/watch?v=aTJMiLPV4P8",
      start: 0,
      end: 5,
      duration: 5,
      tags: ['#stepbrothers', '#catalinawinemixer', '#prestige', '#worldwide', '#funny', '#hype', '#event']
    },
    {
      id: 21,
      title: "Step Brothers - Catalina Wine Mixer Performance",
      quote: "Por Ti Volare - full Catalina Wine Mixer performance",
      url: "https://www.youtube.com/watch?v=lJ9HcYuGGiI",
      start: 236,
      end: 460,
      duration: 224,
      tags: ['#stepbrothers', '#catalinawinemixer', '#performance', '#singing', '#andreabocelli', '#funny', '#portivolare', '#boats', '#hoes']
    },
    {
      id: 22,
      title: "Step Brothers - Derek Singing in Car",
      quote: "Derek and Alice singing in the car - Ice Ice Baby",
      url: "https://www.youtube.com/watch?v=wE8IE8UGGiI",
      start: 0,
      end: 88,
      duration: 88,
      tags: ['#stepbrothers', '#derek', '#singing', '#car', '#awkward', '#funny', '#adamscott', '#iceicebaby', '#kathrynhahn']
    },
    {
      id: 23,
      title: "Step Brothers - Dinosaur",
      quote: "That's a velociraptor! Don't let him scare you, he's just mad",
      url: "https://www.youtube.com/watch?v=I8gY0IT0CuA",
      start: 2,
      end: 53,
      duration: 51,
      tags: ['#stepbrothers', '#dinosaur', '#velociraptor', '#funny', '#richardjenkins', '#dad', '#roar']
    },
    {
      id: 24,
      title: "Step Brothers - Did You Touch My Drum Set",
      quote: "Did you touch my drum set? No. Why are you all sweaty?",
      url: "https://www.youtube.com/watch?v=MbWsITc-zpA",
      start: 60,
      end: 126,
      duration: 66,
      tags: ['#stepbrothers', '#drumset', '#didyoutouch', '#willferrell', '#angry', '#funny', '#sweaty', '#confrontation']
    },
    {
      id: 25,
      title: "Step Brothers - Crossbows",
      quote: "Why are you so sweaty? I was watching Cops",
      url: "https://www.youtube.com/watch?v=2opkAxKgAeA",
      start: 35,
      end: 50,
      duration: 15,
      tags: ['#stepbrothers', '#crossbows', '#whyareyousosweaty', '#funny', '#awkward', '#cops', '#nightvision']
    },
    {
      id: 26,
      title: "40 Year Old Virgin - You Know How I Know You're Gay",
      quote: "You know how I know you're gay? How? You like Coldplay",
      url: "https://www.youtube.com/watch?v=DiBOhShCJv8",
      start: 0,
      end: 90,
      duration: 90,
      tags: ['#40yearoldvirgin', '#howidknowyouregay', '#stevecarell', '#paulrudd', '#roast', '#funny', '#comedy', '#coldplay', '#macrame']
    },
    {
      id: 27,
      title: "40 Year Old Virgin - Kevin Hart Work Scene",
      quote: "Kevin Hart workplace rant scene",
      url: "https://www.youtube.com/watch?v=dtVIZBsHVu0",
      start: 10,
      end: 110,
      duration: 100,
      tags: ['#40yearoldvirgin', '#kevinhart', '#work', '#funny', '#comedy', '#rant']
    },
    {
      id: 28,
      title: "Superbad - McLovin",
      quote: "McLovin? What kind of a stupid name is that? What are you trying to be, an Irish R&B singer?",
      url: "https://www.youtube.com/watch?v=vqQmTyOHTsw",
      start: 15,
      end: 118,
      duration: 103,
      tags: ['#superbad', '#mclovin', '#fakeid', '#funny', '#iconic', '#christophermintzplasse', '#jonahhill', '#fogell', '#hawaii']
    },
    {
      id: 29,
      title: "Superbad - Funny Thing About My Back",
      quote: "The funny thing about my back is it's located on my dick",
      url: "https://www.youtube.com/watch?v=IMvr66cu-sA",
      start: 46,
      end: 54,
      duration: 8,
      tags: ['#superbad', '#funnything', '#myback', '#jonahhill', '#funny', '#crude', '#dick']
    },
    {
      id: 30,
      title: "Superbad - Fa Sho",
      quote: "Fa sho... Fa sho",
      url: "https://www.youtube.com/watch?v=IMvr66cu-sA",
      start: 24,
      end: 30,
      duration: 6,
      tags: ['#superbad', '#fasho', '#funny', '#slang']
    },
    {
      id: 31,
      title: "Wedding Crashers - Ma! The Meatloaf!",
      quote: "Ma! The meatloaf! FUCK!",
      url: "https://www.youtube.com/watch?v=l4D5zScOFKU",
      start: 78,
      end: 80,
      duration: 2,
      tags: ['#weddingcrashers', '#meatloaf', '#willferrell', '#ma', '#funny', '#yelling']
    },
    {
      id: 32,
      title: "Wedding Crashers - What an Idiot",
      quote: "What an idiot, what a loser",
      url: "https://www.youtube.com/watch?v=l4D5zScOFKU",
      start: 98,
      end: 110,
      duration: 12,
      tags: ['#weddingcrashers', '#whatanidiot', '#loser', '#willferrell', '#funny', '#chazzreinhold']
    },
    {
      id: 33,
      title: "Wedding Crashers - Vince Vaughn Kisses Priest",
      quote: "Vince Vaughn kissing the priest scene",
      url: "https://www.youtube.com/watch?v=MaGE6j6srCY",
      start: 90,
      end: 139,
      duration: 49,
      tags: ['#weddingcrashers', '#priest', '#kiss', '#vincevaughn', '#awkward', '#funny', '#church']
    },
    {
      id: 34,
      title: "Dumb and Dumber - Dead Bird to Blind Kid",
      quote: "You sold our dead bird to a blind kid? Petey didn't even have a head!",
      url: "https://www.youtube.com/watch?v=tr6zK-I_QCE",
      start: 47,
      end: 70,
      duration: 23,
      tags: ['#dumbanddumber', '#deadbird', '#blindkid', '#petey', '#jimcarrey', '#jeffdaniels', '#funny', '#parakeet']
    },
    {
      id: 35,
      title: "Dumb and Dumber - Toilet Scene",
      quote: "Bathroom emergency laxative scene",
      url: "https://www.youtube.com/watch?v=kK-2E4MTc3Y",
      start: 25,
      end: 55,
      duration: 30,
      tags: ['#dumbanddumber', '#toilet', '#bathroom', '#jeffdaniels', '#funny', '#gross', '#laxative']
    },
    {
      id: 36,
      title: "Dumb and Dumber - So You're Telling Me There's a Chance",
      quote: "So you're telling me there's a chance! YEAH!",
      url: "https://www.youtube.com/watch?v=-9IgLueodZA",
      start: 47,
      end: 55,
      duration: 8,
      tags: ['#dumbanddumber', '#theresachance', '#optimistic', '#jimcarrey', '#funny', '#hope', '#delusional']
    },
    {
      id: 37,
      title: "Tommy Boy - Fat Guy in a Little Coat",
      quote: "Fat guy in a little coat",
      url: "https://www.youtube.com/watch?v=ohz8_IafGwE",
      start: 32,
      end: 50,
      duration: 18,
      tags: ['#tommyboy', '#fatguy', '#littlecoat', '#chrisfarley', '#davidspade', '#funny', '#dancing', '#richardscoat']
    },
    {
      id: 38,
      title: "A Few Good Men - You Can't Handle the Truth",
      quote: "You can't handle the truth!",
      url: "https://www.youtube.com/watch?v=9FnO3igOkOk",
      start: 39,
      end: 47,
      duration: 8,
      tags: ['#afewgoodmen', '#youcanthandlethetruth', '#jacknicholson', '#tomcruise', '#courtroom', '#intense', '#iconic', '#trial', '#coljessup']
    },
    {
      id: 39,
      title: "Godfather - Leave the Gun Take the Cannoli",
      quote: "Leave the gun, take the cannoli",
      url: "https://www.youtube.com/watch?v=yHzh0PvMWTI",
      start: 20,
      end: 24,
      duration: 4,
      tags: ['#godfather', '#leavethegun', '#takecannoli', '#cannoli', '#mob', '#mafia', '#iconic', '#cold', '#clemenza']
    },
    {
      id: 40,
      title: "Godfather - Look How They Massacred My Boy",
      quote: "Look how they massacred my boy",
      url: "https://www.youtube.com/watch?v=Agih0mGuScg",
      start: 249,
      end: 255,
      duration: 6,
      tags: ['#godfather', '#massacred', '#myboy', '#donvito', '#vitocorleone', '#marlonbrando', '#sad', '#emotional', '#sonny']
    },
    {
      id: 41,
      title: "Good Will Hunting - It's Not Your Fault",
      quote: "It's not your fault... It's not your fault",
      url: "https://www.youtube.com/watch?v=ZQht2yOX9Js",
      start: 138,
      end: 218,
      duration: 80,
      tags: ['#goodwillhunting', '#itsnotyourfault', '#robinwilliams', '#mattdamon', '#therapy', '#emotional', '#touching', '#breakthrough', '#crying']
    },
    {
      id: 42,
      title: "Good Will Hunting - I Had to See About a Girl",
      quote: "I had to go see about a girl",
      url: "https://www.youtube.com/watch?v=rzUkLB9vJnU",
      start: 180,
      end: 196,
      duration: 16,
      tags: ['#goodwillhunting', '#seeaboutagirl', '#mattdamon', '#robinwilliams', '#love', '#wholesome', '#skylar']
    },
    {
      id: 43,
      title: "Good Will Hunting - Math Classroom Genius",
      quote: "Will solves impossible math problem on hallway chalkboard",
      url: "https://www.youtube.com/watch?v=PKL2uB1gNK0",
      start: 0,
      end: 180,
      duration: 180,
      tags: ['#goodwillhunting', '#math', '#classroom', '#genius', '#mattdamon', '#janitor', '#brilliant', '#mit', '#chalkboard']
    },
    {
      id: 44,
      title: "Good Will Hunting - Wicked Smart Bar Scene",
      quote: "My boy's wicked smart - bar Harvard student confrontation",
      url: "https://www.youtube.com/watch?v=hIdsjNGCGz4",
      start: 110,
      end: 218,
      duration: 108,
      tags: ['#goodwillhunting', '#wickedsmart', '#bar', '#harvard', '#mattdamon', '#roast', '#intellectual', '#benaffleck', '#chuckie']
    },
    {
      id: 45,
      title: "Good Will Hunting - How Bout Them Apples",
      quote: "How do you like them apples?",
      url: "https://www.youtube.com/watch?v=9Z8pQds_GwQ",
      start: 279,
      end: 292,
      duration: 13,
      tags: ['#goodwillhunting', '#howboutthemapples', '#howyoulikethemapples', '#mattdamon', '#phonenumber', '#confident', '#iconic', '#skylar']
    },
    {
      id: 46,
      title: "Good Will Hunting - Ben Affleck Winning Ticket (Full)",
      quote: "You got a winning lottery ticket, the best day of my life would be knocking on your door and you're not there",
      url: "https://www.youtube.com/watch?v=Xv7eeMikM_w",
      start: 79,
      end: 170,
      duration: 91,
      tags: ['#goodwillhunting', '#winningticket', '#benaffleck', '#friendship', '#emotional', '#speech', '#bestdayofmylife', '#chuckie', '#full']
    },
    {
      id: 47,
      title: "Good Will Hunting - Ben Affleck Winning Ticket (Short)",
      quote: "Best day of my life would be if I knocked on your door and you weren't there",
      url: "https://www.youtube.com/watch?v=Xv7eeMikM_w",
      start: 104,
      end: 170,
      duration: 66,
      tags: ['#goodwillhunting', '#winningticket', '#benaffleck', '#bestday', '#friendship', '#emotional', '#short', '#chuckie']
    },
    {
      id: 48,
      title: "Shawshank Redemption - Get Busy Living",
      quote: "Get busy living, or get busy dying",
      url: "https://www.youtube.com/watch?v=46GwJbrMghQ",
      start: 174,
      end: 186,
      duration: 12,
      tags: ['#shawshank', '#shawshankredemption', '#getbusyliving', '#getbusydying', '#timrobbins', '#andydufresne', '#motivational', '#prison', '#hope']
    },
    {
      id: 49,
      title: "Shawshank Redemption - Rehabilitated Speech",
      quote: "Rehabilitated? Well now let me see, I don't have any idea what that means",
      url: "https://www.youtube.com/watch?v=hUbIsfzOjk4",
      start: 34,
      end: 140,
      duration: 106,
      tags: ['#shawshank', '#shawshankredemption', '#rehabilitated', '#morganfreeman', '#red', '#parole', '#speech', '#powerful']
    },
    {
      id: 50,
      title: "Training Day - King Kong Ain't Got Shit (Full)",
      quote: "King Kong ain't got shit on me!",
      url: "https://www.youtube.com/watch?v=Lj4adAAHa68",
      start: 0,
      end: 53,
      duration: 53,
      tags: ['#trainingday', '#kingkong', '#kingkongaintgotshit', '#denzelwashington', '#alonzo', '#intense', '#breakdown', '#angry', '#full']
    },
    {
      id: 51,
      title: "Training Day - King Kong Ain't Got Shit (Short)",
      quote: "King Kong ain't got SHIT on me!",
      url: "https://www.youtube.com/watch?v=Lj4adAAHa68",
      start: 49,
      end: 53,
      duration: 4,
      tags: ['#trainingday', '#kingkong', '#kingkongaintgotshit', '#denzelwashington', '#intense', '#angry', '#short', '#iconic']
    },
    {
      id: 52,
      title: "Training Day - My Nigga",
      quote: "My nigga... my man",
      url: "https://www.youtube.com/watch?v=a1l9klFqEcs",
      start: 119,
      end: 123,
      duration: 4,
      tags: ['#trainingday', '#mynigga', '#myman', '#denzelwashington', '#brotherhood']
    },
    {
      id: 53,
      title: "The Other Guys - Bar Mitzvah Story",
      quote: "I woke up and took the belt off my neck, got out of there. Bar Mitzvahs",
      url: "https://www.youtube.com/watch?v=WdF6zflofAM",
      start: 4,
      end: 17,
      duration: 13,
      tags: ['#theotherguys', '#barmitzvah', '#willferrell', '#allenGamble', '#funny', '#absurd', '#wtf', '#story']
    },
    {
      id: 54,
      title: "The Other Guys - Shaved",
      quote: "You might think because of the beard I'm really hairy, but I'm not. Shaved",
      url: "https://www.youtube.com/watch?v=QZGIlxk96gI",
      start: 5,
      end: 15,
      duration: 10,
      tags: ['#theotherguys', '#shaved', '#willferrell', '#awkward', '#funny', '#beard']
    },
    {
      id: 55,
      title: "The Other Guys - Aim for the Bushes",
      quote: "Aim for the bushes?",
      url: "https://www.youtube.com/watch?v=MvkN3003iU4",
      start: 78,
      end: 104,
      duration: 26,
      tags: ['#theotherguys', '#aimforthebushes', '#funny', '#absurd', '#epic', '#wtf', '#jump', '#therock', '#samuelljackson']
    },
    {
      id: 56,
      title: "The Other Guys - Dirty Mike and the Boys",
      quote: "Thanks for the F-shack, love Dirty Mike and the boys",
      url: "https://www.youtube.com/watch?v=u1j4mK6cs_A",
      start: 59,
      end: 65,
      duration: 6,
      tags: ['#theotherguys', '#dirtymike', '#fshack', '#soupkitchen', '#funny', '#absurd', '#wtf', '#prius']
    },
    {
      id: 57,
      title: "The Other Guys - Dirty Mike Full Scene",
      quote: "We will have sex in your car, it will happen again - soup kitchen",
      url: "https://www.youtube.com/watch?v=u1j4mK6cs_A",
      start: 0,
      end: 65,
      duration: 65,
      tags: ['#theotherguys', '#dirtymike', '#fshack', '#soupkitchen', '#funny', '#absurd', '#full', '#prius']
    },
    {
      id: 58,
      title: "The Other Guys - A-Rod Bi-Racial Angel",
      quote: "You shoulda shot A-rod. He's a bi-racial angel",
      url: "https://www.youtube.com/watch?v=11AXKv66Uac",
      start: 39,
      end: 56,
      duration: 17,
      tags: ['#theotherguys', '#arod', '#biracialangel', '#alexrodriguez', '#funny', '#absurd', '#markwahlberg']
    },
    {
      id: 59,
      title: "The Other Guys - A-Rod Full Scene",
      quote: "You shoulda shot A-rod, tuna vs lion full scene",
      url: "https://www.youtube.com/watch?v=11AXKv66Uac",
      start: 0,
      end: 56,
      duration: 56,
      tags: ['#theotherguys', '#arod', '#tuna', '#biracialangel', '#funny', '#absurd', '#full']
    },
    {
      id: 60,
      title: "The Other Guys - Gator Needs His Gat",
      quote: "Gator needs his gat, you punk ass bitch",
      url: "https://www.youtube.com/watch?v=BO_JNY2k7vA",
      start: 6,
      end: 18,
      duration: 12,
      tags: ['#theotherguys', '#gator', '#gatorsneedtheirgat', '#willferrell', '#funny', '#intense', '#pimp']
    },
    {
      id: 61,
      title: "The Other Guys - 20 Miles Chase",
      quote: "Nobody leaves our house without making love to my wife! They chased us 20 miles!",
      url: "https://www.youtube.com/watch?v=t4bYSWPIetA",
      start: 210,
      end: 223,
      duration: 13,
      tags: ['#theotherguys', '#20miles', '#funny', '#absurd', '#wtf', '#wife']
    },
    {
      id: 62,
      title: "Miracle - Great Moments Speech",
      quote: "Great moments are born from great opportunities",
      url: "https://www.youtube.com/watch?v=tdmyoMe4iHM",
      start: 120,
      end: 233,
      duration: 113,
      tags: ['#miracle', '#greatmoments', '#herbbrooks', '#kurtrussell', '#motivational', '#hype', '#speech', '#inspirational', '#hockey', '#olympics']
    },
    {
      id: 63,
      title: "Miracle - Mike Eruzione USA",
      quote: "Mike Eruzione, Winthrop Massachusetts, United States of America",
      url: "https://www.youtube.com/watch?v=AEXS8TBd6ug",
      start: 64,
      end: 96,
      duration: 32,
      tags: ['#miracle', '#mikeeruzione', '#usaolympics', '#motivational', '#hype', '#hockey', '#patriotic', '#unitedstates']
    },
    {
      id: 64,
      title: "Miracle - Who Do You Play For",
      quote: "Who do you play for?",
      url: "https://www.youtube.com/watch?v=AEXS8TBd6ug",
      start: 82,
      end: 96,
      duration: 14,
      tags: ['#miracle', '#whodoYouplayfor', '#herbbrooks', '#motivational', '#intense', '#hype', '#hockey']
    },
    {
      id: 65,
      title: "Miracle - Bruise on the Leg",
      quote: "A bruise on the leg is a hell of a long way from the heart",
      url: "https://www.youtube.com/watch?v=wY5LGFhiTBU",
      start: 48,
      end: 70,
      duration: 22,
      tags: ['#miracle', '#bruise', '#tough', '#hockey', '#herbbrooks', '#toughness']
    },
    {
      id: 66,
      title: "National Treasure - I'm Going to Steal It",
      quote: "I'm going to steal it... I'm going to steal the Declaration of Independence",
      url: "https://www.youtube.com/watch?v=AviSocVyEWI",
      start: 71,
      end: 81,
      duration: 10,
      tags: ['#nationaltresure', '#imgoingtostealit', '#declarationofindependence', '#nicolascage', '#benjaminfranklinhgates', '#confident', '#funny', '#badass']
    },
    {
      id: 67,
      title: "National Treasure - It Was Iron",
      quote: "It was iron, it was... pipe",
      url: "https://www.youtube.com/watch?v=h4ey-CsLTBw",
      start: 8,
      end: 45,
      duration: 37,
      tags: ['#nationaltresure', '#iron', '#pipe', '#nicolascage', '#funny', '#absurd']
    },
    {
      id: 68,
      title: "National Treasure - Secret Lies in Charlotte",
      quote: "The secret lies with Charlotte",
      url: "https://www.youtube.com/watch?v=kiYKcEwPEZI",
      start: 19,
      end: 24,
      duration: 5,
      tags: ['#nationaltresure', '#secretliesincharlotte', '#charlotte', '#nicolascage', '#epic', '#revelation', '#treasure']
    },
    {
      id: 69,
      title: "Dodgeball - Bold Strategy Cotton",
      quote: "That's a bold strategy Cotton, let's see if it pays off for them",
      url: "https://www.youtube.com/watch?v=uLr0v9MyGgM",
      start: 104,
      end: 110,
      duration: 6,
      tags: ['#dodgeball', '#boldstrategy', '#cotton', '#letsseeifitpaysoff', '#funny', '#sarcastic', '#commentary']
    },
    {
      id: 70,
      title: "Tropic Thunder - Never Go Full Retard",
      quote: "Never go full retard. Everybody knows you never go full retard",
      url: "https://www.youtube.com/watch?v=X6WHBO_Qc-Q",
      start: 87,
      end: 132,
      duration: 45,
      tags: ['#tropicthunder', '#nevergoFullretard', '#robertdowneyjr', '#funny', '#advice', '#acting']
    },
    {
      id: 71,
      title: "Out Cold - Mexico Story",
      quote: "I was bummin in a hole down in what's called Mexico, 80s",
      url: "https://www.youtube.com/watch?v=J2tAF4hkFlo",
      start: 7,
      end: 60,
      duration: 53,
      tags: ['#outcold', '#mexico', '#80s', '#funny', '#absurd', '#story', '#drunk']
    },
    {
      id: 72,
      title: "Send It Guy",
      quote: "Are you silly? I'm still gonna send it!",
      url: "https://www.youtube.com/watch?v=RSuLFvalhnQ",
      start: 3,
      end: 8,
      duration: 5,
      tags: ['#sendit', '#stillgonnasendit', '#silly', '#areyousilly', '#funny', '#confident', '#letsgo', '#meme', '#viral']
    },
    {
      id: 73,
      title: "Talladega Nights - Spider Monkey",
      quote: "Chip I'm gonna come at you like a spider monkey!",
      url: "https://www.youtube.com/watch?v=eY5VNDvea1M",
      start: 260,
      end: 285,
      duration: 25,
      tags: ['#taladeganights', '#spidermonkey', '#willferrell', '#rickybobby', '#funny', '#angry', '#intense']
    },
    {
      id: 74,
      title: "Talladega Nights - God Bless Troops",
      quote: "God bless our troops... Gentlemen, start your engines!",
      url: "https://www.youtube.com/watch?v=9hMyzztXmmY",
      start: 8,
      end: 28,
      duration: 20,
      tags: ['#taladeganights', '#godblessourtroops', '#startyourengines', '#willferrell', '#funny', '#patriotic', '#absurd', '#racing']
    },
    {
      id: 75,
      title: "Eric Clapton - Layla",
      quote: "Eric Clapton cigarette playing Layla guitar",
      url: "https://www.youtube.com/watch?v=-KG2O5PSCSs",
      start: 2,
      end: 25,
      duration: 23,
      tags: ['#clapton', '#ericclapton', '#layla', '#guitar', '#cool', '#music', '#smooth', '#cigarette']
    },
    {
      id: 76,
      title: "Double Cheeked Up",
      quote: "Double cheeked up on a Thursday afternoon, hella ass",
      url: "https://www.youtube.com/watch?v=zcQj_IrV3J0",
      start: 10,
      end: 34,
      duration: 24,
      tags: ['#doublecheeked', '#thursday', '#hellaass', '#funny', '#meme', '#absurd', '#viral']
    },
    {
      id: 77,
      title: "Remember the Titans - Left Side Strong Side",
      quote: "Left side! Strong side! Left side! Strong side!",
      url: "https://www.youtube.com/watch?v=-AWtpFqKD-o",
      start: 66,
      end: 84,
      duration: 18,
      tags: ['#rememberthetitans', '#leftside', '#strongside', '#chant', '#hype', '#motivational', '#football', '#defense']
    },
    {
      id: 78,
      title: "Remember the Titans - We Will Blitz All Night",
      quote: "I don't want them to gain another yard. We will blitz all... night!",
      url: "https://www.youtube.com/watch?v=i8vXroMMGdM",
      start: 115,
      end: 133,
      duration: 18,
      tags: ['#rememberthetitans', '#blitzallnight', '#defense', '#hype', '#motivational', '#football', '#denzellwashington']
    },
    {
      id: 79,
      title: "Remember the Titans - 12 Brothers and Sisters",
      quote: "You have 12 brothers and sisters? Yeah",
      url: "https://clip.cafe/remember-the-titans-2000/you-1-2-brothers-sisters/",
      start: 0,
      end: 15,
      duration: 15,
      tags: ['#rememberthetitans', '#12brothers', '#family', '#funny', '#wholesome', '#football']
    },
    {
      id: 80,
      title: "Remember the Titans - Gettysburg Speech",
      quote: "This is where Gettysburg was fought. 50,000 men died right here on this field",
      url: "https://www.youtube.com/watch?v=uiqdA1B3_Nc",
      start: 90,
      end: 180,
      duration: 90,
      tags: ['#rememberthetitans', '#gettysburg', '#speech', '#motivational', '#denzellwashington', '#football', '#brotherhood', '#cemetery']
    },
    {
      id: 81,
      title: "Gone in 60 Seconds - Ok Let's Ride",
      quote: "Ok, let's ride",
      url: "https://www.youtube.com/watch?v=Igv_ChOEp2E",
      start: 53,
      end: 58,
      duration: 5,
      tags: ['#gonein60seconds', '#letsride', '#nicolascage', '#confident', '#cool', '#smooth', '#cars']
    },
    {
      id: 82,
      title: "Forgetting Sarah Marshall - Go Fuck Myself",
      quote: "I'll just go fuck myself",
      url: "https://www.youtube.com/watch?v=K0mgGp9DS68",
      start: 5,
      end: 9,
      duration: 4,
      tags: ['#forgettingsarahmarshall', '#gofuckmyself', '#jasonsegel', '#funny', '#awkward', '#sad', '#defeated', '#mood']
    },
    {
      id: 83,
      title: "Workaholics - Least Amount of Money",
      quote: "What is the least amount of money you could get paid to...",
      url: "https://www.youtube.com/watch?v=ssDICRX_rK8",
      start: 0,
      end: 30,
      duration: 30,
      tags: ['#workaholics', '#leastamountofmoney', '#funny', '#absurd']
    },
    {
      id: 84,
      title: "Leeroy Jenkins - WoW Raid",
      quote: "Alright let's do this! LEEROY JENKINS!",
      url: "https://www.youtube.com/watch?v=mLyOj_QD4a4",
      start: 84,
      end: 151,
      duration: 67,
      tags: ['#leeroy', '#leeroyjenkins', '#wow', '#worldofwarcraft', '#gaming', '#funny', '#meme', '#legendary', '#raid']
    },
    {
      id: 85,
      title: "School of Rock - Stick It to the Man",
      quote: "Stick it to the man!",
      url: "https://www.youtube.com/watch?v=AEN4Lp_prkc",
      start: 19,
      end: 88,
      duration: 69,
      tags: ['#schoolofrock', '#stickittotheman', '#jackblack', '#music', '#hype', '#performance']
    },
    {
      id: 86,
      title: "School of Rock - Immigrant Song",
      quote: "Immigrant Song Led Zeppelin performance",
      url: "https://www.youtube.com/watch?v=bKEcuADW6VM",
      start: 0,
      end: 27,
      duration: 27,
      tags: ['#schoolofrock', '#immigrantsong', '#ledzeppelin', '#jackblack', '#music', '#performance']
    },
    {
      id: 87,
      title: "Wayne's World - Bohemian Rhapsody Car",
      quote: "Bohemian Rhapsody car scene headbanging",
      url: "https://www.youtube.com/watch?v=thyJOnasHVE",
      start: 20,
      end: 49,
      duration: 29,
      tags: ['#waynesworld', '#bohemianrhapsody', '#queen', '#car', '#headbanging', '#mikemyers', '#music', '#funny']
    },
    {
      id: 88,
      title: "Wayne's World - We're Not Worthy",
      quote: "We're not worthy! We're not worthy!",
      url: "https://www.youtube.com/watch?v=jjaqrPpdQYc",
      start: 14,
      end: 23,
      duration: 9,
      tags: ['#waynesworld', '#notworthy', '#wearenotworthy', '#mikemyers', '#bow', '#funny']
    },
    {
      id: 89,
      title: "Die Hard - Yippee Ki Yay",
      quote: "Yippee ki yay, motherfucker",
      url: "https://www.youtube.com/watch?v=BSRrzrQtmto",
      start: 43,
      end: 45,
      duration: 2,
      tags: ['#diehard', '#yippeekiyay', '#brucewillis', '#johnmcclane', '#badass', '#action', '#christmas']
    },
    {
      id: 90,
      title: "Predator - Get to the Chopper",
      quote: "Get to the chopper!",
      url: "https://www.youtube.com/watch?v=M4nFSdNNFQw",
      start: 40,
      end: 43,
      duration: 3,
      tags: ['#predator', '#gettothechopper', '#arnoldschwarzenegger', '#intense', '#action', '#helicopter']
    },
    {
      id: 91,
      title: "Taken - Particular Set of Skills",
      quote: "I have a very particular set of skills. I will find you and I will kill you",
      url: "https://www.youtube.com/watch?v=AEJNre8p0uY",
      start: 210,
      end: 252,
      duration: 42,
      tags: ['#taken', '#particularskills', '#particularsetofskills', '#liamneeson', '#badass', '#intense', '#phone', '#threat']
    },
    {
      id: 92,
      title: "The Matrix - Dodge This",
      quote: "Dodge this",
      url: "https://www.youtube.com/watch?v=8DajVKAkL50",
      start: 38,
      end: 63,
      duration: 25,
      tags: ['#matrix', '#thematrix', '#dodgethis', '#trinity', '#carrieannmoss', '#badass', '#cool', '#agent']
    },
    {
      id: 93,
      title: "Breaking Bad - I Am the One Who Knocks (Full)",
      quote: "I am not in danger Skyler, I am the danger. I am the one who knocks!",
      url: "https://www.youtube.com/watch?v=Ca3kPemW2CE",
      start: 15,
      end: 58,
      duration: 43,
      tags: ['#breakingbad', '#iamtheonewhoknocks', '#waltervwhite', '#heisenberg', '#bryancranston', '#badass', '#intense', '#skyler', '#full']
    },
    {
      id: 94,
      title: "Breaking Bad - I Am the One Who Knocks (Short)",
      quote: "I am the one who knocks!",
      url: "https://www.youtube.com/watch?v=Ca3kPemW2CE",
      start: 45,
      end: 58,
      duration: 13,
      tags: ['#breakingbad', '#iamtheonewhoknocks', '#waltervwhite', '#heisenberg', '#bryancranston', '#badass', '#short']
    },
    {
      id: 95,
      title: "Breaking Bad - Tight Tight Tight",
      quote: "Tight tight tight! Blue yellow pink, whatever man, just keep bringing me that!",
      url: "https://www.youtube.com/watch?v=qLHLsbD9emc",
      start: 8,
      end: 30,
      duration: 22,
      tags: ['#breakingbad', '#tight', '#tighttighttight', '#tuco', '#crazy', '#intense', '#meth']
    },
    {
      id: 96,
      title: "The Office - Parkour",
      quote: "Parkour! Parkour! Parkour!",
      url: "https://www.youtube.com/watch?v=0Kvw2BPKjz0",
      start: 4,
      end: 83,
      duration: 79,
      tags: ['#theoffice', '#parkour', '#michaelscott', '#stevecarell', '#andybernard', '#dwightschrute', '#funny', '#opening']
    },
    {
      id: 97,
      title: "The Office - I Declare Bankruptcy",
      quote: "I declare bankruptcy!",
      url: "https://www.youtube.com/watch?v=C-m3RtoguAQ",
      start: 64,
      end: 74,
      duration: 10,
      tags: ['#theoffice', '#ideclarebankruptcy', '#bankruptcy', '#michaelscott', '#stevecarell', '#funny', '#yelling']
    },
    {
      id: 98,
      title: "South Park - It's Gone (Full)",
      quote: "Aaaand it's gone",
      url: "https://www.youtube.com/watch?v=-DT7bX-B1Mg",
      start: 20,
      end: 50,
      duration: 30,
      tags: ['#southpark', '#itsgone', '#bank', '#funny', '#money', '#economy', '#full']
    },
    {
      id: 99,
      title: "South Park - It's Gone (Short)",
      quote: "Aaaand it's gone",
      url: "https://www.youtube.com/watch?v=-DT7bX-B1Mg",
      start: 38,
      end: 50,
      duration: 12,
      tags: ['#southpark', '#itsgone', '#andits gone', '#funny', '#short']
    },
    {
      id: 100,
      title: "Parks and Rec - Kim Kardashian Comeback",
      quote: "Chris Pratt Kim Kardashian comeback blooper",
      url: "https://www.youtube.com/watch?v=UL0jxK58i_c",
      start: 0,
      end: 30,
      duration: 30,
      tags: ['#parksandrec', '#kimkardashian', '#comeback', '#chrisppratt', '#andydwyer', '#blooper', '#funny', '#viral']
    },
    {
      id: 101,
      title: "It's Always Sunny - Wildcard Bitches",
      quote: "Wildcard bitches! Yeehaw!",
      url: "https://www.youtube.com/watch?v=MYtjpIwamos",
      start: 0,
      end: 5,
      duration: 5,
      tags: ['#alwayssunny', '#itsalwayssunny', '#wildcard', '#wildcardb itches', '#charlie', '#charlieday', '#funny', '#absurd']
    },
    {
      id: 102,
      title: "Brooklyn Nine-Nine - I Want It That Way",
      quote: "Number 5. I want it that way. Tell me why!",
      url: "https://www.youtube.com/watch?v=HlBYdiXdUa8",
      start: 9,
      end: 67,
      duration: 58,
      tags: ['#brooklynnine nine', '#iwantitthatway', '#backstreetboys', '#andysamberg', '#jakeperalta', '#lineup', '#funny', '#singing']
    },
    {
      id: 103,
      title: "Zoolander - Center for Ants",
      quote: "What is this? A center for ants?!",
      url: "https://www.youtube.com/watch?v=LQc8NDKcnpM",
      start: 82,
      end: 85,
      duration: 3,
      tags: ['#zoolander', '#centerforrants', '#benstiller', '#derekzoolander', '#funny', '#absurd', '#model']
    },
    {
      id: 104,
      title: "Austin Powers - I Too Like to Live Dangerously",
      quote: "I also like to live dangerously",
      url: "https://www.youtube.com/watch?v=b6_IZK-1naY",
      start: 4,
      end: 25,
      duration: 21,
      tags: ['#austinpowers', '#livedangerously', '#mikemyers', '#funny', '#confident']
    },
    {
      id: 105,
      title: "Austin Powers - Steamroller Guy",
      quote: "Slow motion steamroller guy getting run over",
      url: "https://www.youtube.com/watch?v=y_PrZ-J7D3k",
      start: 0,
      end: 60,
      duration: 60,
      tags: ['#austinpowers', '#steamroller', '#funny', '#absurd', '#slowmotion']
    },
    {
      id: 106,
      title: "Austin Powers - Tent Scene Give It a Tug",
      quote: "Just give it a good tug tent scene",
      url: "https://www.youtube.com/watch?v=UZXa_HfOMAs",
      start: 19,
      end: 92,
      duration: 73,
      tags: ['#austinpowers', '#tent', '#silhouette', '#mikemyers', '#funny', '#absurd', '#innuendo']
    },
    {
      id: 107,
      title: "Eastbound and Down - Plums",
      quote: "Let the boy watch. I can feel it down in my plums",
      url: "https://www.youtube.com/watch?v=1JE4JJddZx4",
      start: 5,
      end: 90,
      duration: 85,
      tags: ['#eastboundanddown', '#plums', '#dannymcbride', '#kennypowers', '#funny', '#absurd', '#lettheboywatch']
    },
    {
      id: 108,
      title: "Lord of the Rings - Fly You Fools",
      quote: "Fly, you fools!",
      url: "https://www.youtube.com/watch?v=mJZZNHekEQw",
      start: 128,
      end: 132,
      duration: 4,
      tags: ['#lordoftherings', '#lotr', '#gandalf', '#flyyoufools', '#ianmckellen', '#emotional', '#sacrifice', '#fellowship', '#moria']
    },
    {
      id: 109,
      title: "Lord of the Rings - Theoden's Charge Intro",
      quote: "Arise, arise, Riders of Theoden! Intro to Pelennor Fields",
      url: "https://www.youtube.com/watch?v=7lwJOxN_gXc",
      start: 78,
      end: 223,
      duration: 145,
      tags: ['#lordoftherings', '#lotr', '#theoden', '#arise', '#ridersoftheoden', '#pelennorfields', '#battle', '#hype', '#epic', '#speech', '#returnoftheking']
    },
    {
      id: 110,
      title: "Lord of the Rings - Arise Riders Speech",
      quote: "Arise, arise, Riders of Theoden. Spears shall be shaken, shields shall be splintered",
      url: "https://www.youtube.com/watch?v=7lwJOxN_gXc",
      start: 147,
      end: 223,
      duration: 76,
      tags: ['#lordoftherings', '#lotr', '#theoden', '#arise', '#spears', '#shields', '#battle', '#hype', '#epic', '#rohirrim']
    },
    {
      id: 111,
      title: "Lord of the Rings - DEATH!!!",
      quote: "DEATH!!!",
      url: "https://www.youtube.com/watch?v=7lwJOxN_gXc",
      start: 196,
      end: 223,
      duration: 27,
      tags: ['#lordoftherings', '#lotr', '#theoden', '#death', '#battle', '#charge', '#hype', '#epic', '#badass', '#pelennorfields']
    },
    {
      id: 112,
      title: "Lord of the Rings - Aragorn's Speech",
      quote: "A day may come when the courage of men fails... but it is not this day",
      url: "https://www.youtube.com/watch?v=SwMUY5ro5Xo",
      start: 11,
      end: 63,
      duration: 52,
      tags: ['#lordoftherings', '#lotr', '#aragorn', '#adaymacome', '#courage', '#butitisnotthisday', '#speech', '#motivational', '#epic', '#blackgate', '#viggo mortensen']
    },
    {
      id: 113,
      title: "Lord of the Rings - Keep Your Secrets",
      quote: "Alright then, keep your secrets",
      url: "https://www.youtube.com/watch?v=AubJS7oWaWo",
      start: 2,
      end: 6,
      duration: 4,
      tags: ['#lordoftherings', '#lotr', '#frodo', '#keepsecrets', '#alrightthen', '#gandalf', '#funny', '#sassy', '#meme', '#elijahwood']
    },
    {
      id: 114,
      title: "Lord of the Rings - You Bow to No One",
      quote: "My friends, you bow to no one",
      url: "https://www.youtube.com/watch?v=2H4Q_aA4QiQ",
      start: 240,
      end: 270,
      duration: 30,
      tags: ['#lordoftherings', '#lotr', '#aragorn', '#youbowtonoone', '#myfriends', '#hobbits', '#emotional', '#respect', '#epic', '#wholesome', '#returnoftheking']
    },
    {
      id: 115,
      title: "Lord of the Rings - I Am No Man",
      quote: "I am no man",
      url: "https://www.youtube.com/watch?v=2elqogqt0pI",
      start: 23,
      end: 30,
      duration: 7,
      tags: ['#lordoftherings', '#lotr', '#eowyn', '#iamnoman', '#witchking', '#badass', '#epic', '#cool', '#feminism', '#roast']
    },
    {
      id: 116,
      title: "Lord of the Rings - Beacons of Minas Tirith",
      quote: "The beacons of Minas Tirith! The beacons are lit! Gondor calls for aid",
      url: "https://www.youtube.com/watch?v=i6LGJ7evrAg",
      start: 77,
      end: 150,
      duration: 73,
      tags: ['#lordoftherings', '#lotr', '#beacons', '#minasTirith', '#gondor', '#gondorcallsforaid', '#epic', '#hype', '#aragorn', '#theoden']
    },
    {
      id: 117,
      title: "Lord of the Rings - GROND",
      quote: "GROND! GROND! GROND!",
      url: "https://www.youtube.com/watch?v=1zyUWqj1K60",
      start: 51,
      end: 60,
      duration: 9,
      tags: ['#lordoftherings', '#lotr', '#grond', '#batteringram', '#chant', '#hype', '#battle', '#siege', '#minasTirith']
    },
    {
      id: 118,
      title: "Lord of the Rings - Draw Swords Together",
      quote: "Let this be the hour when we draw swords together. Fell deeds awake, now for wrath, now for ruin",
      url: "https://www.youtube.com/watch?v=3fbhVPnhX-4",
      start: 0,
      end: 76,
      duration: 76,
      tags: ['#lordoftherings', '#lotr', '#aragorn', '#drawswords', '#helmsdeep', '#battle', '#epic', '#motivational', '#hype', '#theoden']
    },
    {
      id: 119,
      title: "Lord of the Rings - To War",
      quote: "To War!",
      url: "https://www.youtube.com/watch?v=TQq4LjSF2rc",
      start: 95,
      end: 99,
      duration: 4,
      tags: ['#lordoftherings', '#lotr', '#theoden', '#towar', '#battle', '#hype', '#charge', '#helmsdeep']
    },
    {
      id: 120,
      title: "Lord of the Rings - Po-ta-toes",
      quote: "Po-ta-toes! Boil 'em, mash 'em, stick 'em in a stew",
      url: "https://www.youtube.com/watch?v=JXuqJ4c1dxE",
      start: 68,
      end: 73,
      duration: 5,
      tags: ['#lordoftherings', '#lotr', '#samwise', '#potatoes', '#boilem', '#mashem', '#stew', '#funny', '#gollum', '#seanastin']
    },
    {
      id: 121,
      title: "Lord of the Rings - You Shall Not Pass (Full)",
      quote: "You shall not pass!",
      url: "https://www.youtube.com/watch?v=mJZZNHekEQw",
      start: 84,
      end: 132,
      duration: 48,
      tags: ['#lordoftherings', '#lotr', '#gandalf', '#youshallnotpass', '#shallnotpass', '#balrog', '#ianmckellen', '#badass', '#epic', '#moria', '#full']
    },
    {
      id: 122,
      title: "Independence Day - Presidential Speech",
      quote: "Perhaps it's fate that today is the 4th of July, and you will once again be fighting for your freedom",
      url: "https://www.youtube.com/watch?v=9t1IK_9apWs",
      start: 29,
      end: 123,
      duration: 94,
      tags: ['#independenceday', '#presidentspeech', '#billpullman', '#4thofjuly', '#speech', '#hype', '#motivational', '#epic', '#wedonotvanish', '#inspirational', '#aliens']
    },
    {
      id: 123,
      title: "Miracle - Who Do You Play For (Mike Eruzione)",
      quote: "Who do you play for? Mike Eruzione!",
      url: "https://www.youtube.com/watch?v=AEXS8TBd6ug",
      start: 64,
      end: 96,
      duration: 32,
      tags: ['#miracle', '#whodoYouplayfor', '#mikeeruzione', '#herbbrooks', '#hockey', '#motivational', '#hype', '#team']
    },
    {
      id: 124,
      title: "Workaholics - Least Amount of Money",
      quote: "Ok what is the least amount of money you could get paid to...",
      url: "https://www.youtube.com/watch?v=ssDICRX_rK8",
      start: 0,
      end: 30,
      duration: 30,
      tags: ['#workaholics', '#leastamountofmoney', '#funny', '#absurd', '#comedy']
    }
  ];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const filteredClips = useMemo(() => {
    if (!searchTerm) return clips;
    
    const search = searchTerm.toLowerCase();
    return clips.filter(clip => 
      clip.title.toLowerCase().includes(search) ||
      clip.quote.toLowerCase().includes(search) ||
      clip.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }, [searchTerm]);

  const copyToClipboard = (clip) => {
    const timestampUrl = `${clip.url}&t=${clip.start}s`;
    navigator.clipboard.writeText(timestampUrl);
    setCopiedId(clip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareApp = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setShareMessage('Link copied! Share SceneClips with your friends');
    setTimeout(() => setShareMessage(''), 3000);
  };

  const getYouTubeId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <Film className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 text-pink-400" />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">SceneClips</h1>
          </div>
          <p className="text-purple-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 px-4">
            Find the perfect movie moment in seconds
          </p>
          <button
            onClick={shareApp}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share SceneClips
          </button>
          {shareMessage && (
            <div className="mt-2 sm:mt-3 text-green-300 text-xs sm:text-sm font-medium">{shareMessage}</div>
          )}
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder='Search by quote, movie, actor... Try "freedom", "gladiator", or "Will Ferrell"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base transition-all"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-purple-200 text-sm sm:text-base">
            {filteredClips.length} {filteredClips.length === 1 ? 'clip' : 'clips'} found
          </p>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredClips.map((clip) => {
            const videoId = getYouTubeId(clip.url);
            return (
              <div 
                key={clip.id} 
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-purple-400/30 hover:border-purple-400/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                {videoId && (
                  <div className="relative aspect-video bg-black group cursor-pointer">
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={clip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs sm:text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(clip.duration)}
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-2 line-clamp-2">{clip.title}</h3>
                  <p className="text-purple-200 text-xs sm:text-sm italic mb-3 line-clamp-2">"{clip.quote}"</p>
                  
                  {/* Tags - Show fewer on mobile */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 max-h-16 sm:max-h-20 overflow-hidden">
                    {clip.tags.slice(0, 6).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] sm:text-xs bg-purple-500/30 text-purple-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {clip.tags.length > 6 && (
                      <span className="text-[10px] sm:text-xs text-purple-300">
                        +{clip.tags.length - 6}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => copyToClipboard(clip)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm font-medium"
                    >
                      {copiedId === clip.id ? (
                        <span className="flex items-center gap-1">
                          <span className="text-green-300">âœ“</span> Copied!
                        </span>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">Copy Link</span>
                          <span className="xs:hidden">Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`${clip.url}&t=${clip.start}s`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 active:scale-95 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all text-xs sm:text-sm"
                    >
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Watch</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredClips.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-purple-300 text-lg sm:text-xl mb-2">No clips found</p>
            <p className="text-purple-400 text-sm">Try a different search term</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-400/20">
          <p className="text-purple-300 text-xs sm:text-sm">
            Built for texting friends, creating content, and reliving iconic moments
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;