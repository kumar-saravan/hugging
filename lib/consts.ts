import rocketImg from "../assets/images/rocket.png";

export const defaultHTML = `<!DOCTYPE html>
<html>
  <head>
    <title>My app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="flex justify-center items-center h-screen overflow-hidden bg-[linear-gradient(94.48deg,#ffffff_60%,#eaffea_90%,#d6ffd6_100%)] 
  border rounded-xl [border-image:linear-gradient(94.48deg,#C0FFBA_2.18%,#7BFF6E_95.19%)_1 font-sans text-center px-6">
    <div class="w-full">
      <img src="${rocketImg?.src}" alt="Rocket" class="w-14 h-14 mx-auto mb-2" />
      <h1 class="font-bold font-sans">
        <span class="text-[16px] text-[#0A0A0A] block font-medium">Ready to Design, Ready to Impress.</span>
        <span class="text-[30px] text-[#28AE1B]">What Can I Build for You Today?</span>
      </h1>
    </div>
    <script></script>
  </body>
</html>
`;
