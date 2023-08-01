## What is this project

This is a follow-along exercise from youtube video https://youtu.be/tllZWCQZ9_0 
The design is beautiful and framer motion makes it even more stunning.

## What I learned

### animation/transition and framer motion

in CSS, there are two ways to animate web elements: the **animation** and **transition** properties.

animation needs @keyframes, meaning a start and endpoint must be specified. Keyframes are used for multistep animations.
Simpler web animations can be created using transition. The animation must be triggered by something, like a click or :hover.

> CSS transitions and animations are similar in many ways, but distinct in terms of how complicated transitions can be, 
> how the CSS code interacts with JavaScript, how loops work, and the methodology that triggers the animation to play. 
> CSS transitions are generally best for simple from-to movements, while CSS animations are for more complex series of movements.

In the tutorial, all framer-motion variants are defined in utils/motion.js
Then <motion.div> replace normal div.
I espcially like the effect of TypingText.

### how to leverage between tailwind and css

Some common styles can be made into re-usable styles, especially layout related style.

There are multiple ways to implement this. 
The original project used 3 methods:

1. tailwind.config.js extend theme
```
  theme: {
    extend: {
      colors: {
        "primary-black": "#1A232E",
        "secondary-white": "#c7c7c7",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
    },
  },
```
in the application javascript, we can use the tailwind custom style like this
```
className="ease-out-flex"
className="bg-primary-black text-secondary-white"

```

2. styles/index.js, here using js object to define some layout relate styles using tailwind syntax, 
also some complicated styles
```
const styles = {
  innerWidth: '2xl:max-w-[1280px] w-full',
  interWidth: 'lg:w-[80%] w-[100%]',
  ....

  heroDText:
      'md:w-[212px] sm:w-[80px] w-[60px] md:h-[108px] sm:h-[48px] h-[38px] md:border-[18px] border-[9px] rounded-r-[50px] border-white sm:mx-2 mx-[6px]',
```

in the application files, import styles/index.js
```js
//if don't specify which file, then styles/index.js will be imported as styles
import styles from "../styles";

```

3. styles/globals.css, here defines all gradient related styles, written in normal CSS sytax
```
.gradient-01 {
  background-image: linear-gradient(
    270deg,
    hsl(295deg 76% 51%) 0%,
    hsl(284deg 70% 73%) 26%,
    hsl(257deg 70% 86%) 39%,
    hsl(202deg 92% 90%) 50%,
    hsl(215deg 77% 81%) 61%,
    hsl(221deg 73% 70%) 74%,
    hsl(220deg 76% 51%) 100%
  );
  filter: blur(125px);
}
```

in app/layout.js, import globals.css, it will apply to the whole application, no need to import in other place
```
import "../styles/globals.css";

```
---
**my thought**
I think the "styles/index.js" is not necessary, all custom styles can be put into globals.css.
The syntax of globals.css can be mixed of normal css and tailwind css
```
@layer components {
  /* outmost layer of container with horizontal padding */
  .container {
    @apply px-6 sm:px-16 py-8 relative;  
  }

  /* contain a section of html elements, take full width of outmost container minus padding, with max-width to not stretch the whole width on large screen */
  .wrapper {
    @apply w-full 2xl:max-w-screen-xl mx-auto ;
  }
}

.hero-gradient {
  background: linear-gradient(
    97.86deg,
    #a509ff 0%,
    #34acc7 53.65%,
    #a134c7 100%
  );
}

```

### font optimization

The original app is using link to download the font
- in app/layout.js
```
  <html lang="en">
    <head>
     <link rel="preconnect" href="https://stijndv.com" />
     <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
     /> 
    </head>
    <body>{children}</body>
  </html>
```
- in styles/global.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Eudoxus Sans", sans-serif;
  scroll-behavior: smooth;
}
```

Following [next.js font optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), I changed it as below:
- in app/layout.js
```
import localFont from "next/font/local";

const eudoxus = localFont({
  src: [
    {
      path: "./EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./EudoxusSans-Medium.woff2",
      weight: "600",
    },
    {
      path: "./EudoxusSans-Bold.woff2",
      weight: "700",
    },
    {
      path: "./EudoxusSans-ExtraBold.woff2",
      weight: "800",
    },
  ],
});

const RootLayout = ({ children }) => (
  <html lang="en" className={eudoxus.className}>
    <body>{children}</body>
  </html>
);
```
- in styles/global.css, can comment out the "font-family" line, or can leave it as well

Going a step further, I experimented with combination of local font and google font, and use tailwind "CSS variable".
Here is how it works:
- in app/layout.js
```
import localFont from "next/font/local";
import { Bungee_Spice } from "next/font/google";

const bungee_spice = Bungee_Spice({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bungee",
});

const eudoxus = localFont({
  src: [
    {
      path: "./EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./EudoxusSans-Medium.woff2",
      weight: "600",
    },
    {
      path: "./EudoxusSans-Bold.woff2",
      weight: "700",
    },
    {
      path: "./EudoxusSans-ExtraBold.woff2",
      weight: "800",
    },
  ],
});

const RootLayout = ({ children }) => (
  // by default exduxus sans font, the bungee_spice.variable is not applied globally, it's just to create a CSS variable
  // and can be used later on specific element
  <html lang="en" className={`${eudoxus.className} ${bungee_spice.variable}`}>
    <body>{children}</body>
  </html>
);
```

- in tailwind.config.js
```
theme: {
    extend: {
      fontFamily: {
        bungee: ["var(--font-bungee)"],
      },
```

- in components/Navbar.js, change h2 to use the font-bungee
```
      <h2 className="font-bungee text-white text-2xl leading-7">
        METAVERSES
      </h2>
```

### use self-closing div with custom gradient class to give the background effect
1. gradient class with "filter:blur()" on the dark page background will give light source effect

```js
 <div className="absolute w-1/2 inset-0 gradient-01" />
``` 

```css
.gradient-01 {
  background-image: linear-gradient(
    270deg,
    hsl(295deg 76% 51%) 0%,
    hsl(284deg 70% 73%) 26%,
    hsl(257deg 70% 86%) 39%,
    hsl(202deg 92% 90%) 50%,
    hsl(215deg 77% 81%) 61%,
    hsl(221deg 73% 70%) 74%,
    hsl(220deg 76% 51%) 100%
  );
  filter: blur(125px);
}
```
2. in hero section, gradient class without "filter: blur()" can also be used with image as decoration, 
in the example, with negative top margin, the gradient block is higher than the image below, which gives a border decoration

```js
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-0 -top-[30px] " />
        <img
          src="/cover.png"
          alt="cover"
          className="relative w-full h-[350px] sm:h-[500px] object-cover rounded-tl-[140px] z-10"
        />
```

```css
.hero-gradient {
  background: linear-gradient(
    97.86deg,
    #a509ff 0%,
    #34acc7 53.65%,
    #a134c7 100%
  );
}
```

### section "Explore": use flex-grow to animate expand card on click

```js
const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className={`relative ${
      active === id ? "flex-[5]" : "flex-1"
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-700 ease-out-flex cursor-pointer
    `}
    onClick={() => handleClick(id)}
  >
```
