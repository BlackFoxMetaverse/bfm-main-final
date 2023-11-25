import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import FooterColumn from "../../Modules/FooterColumn/FooterColumn";
import { BsReddit,BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <section className="bg-[#121212] pt-10 ">
      <div className="mx-auto 2xl:w-[1440px] w-full lg:w-full">
        <div className="h-1/2  grid grid-cols-7 p-4 lg:px-20">
          <div className="p-5 col-span-7 lg:col-span-3">
            <svg width="74" height="24" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 0.351192C5.08526 0.117064 8.73766 0 10.9572 0C15.0872 0 18.0513 0.468256 19.8494 1.40477C21.4602 2.24763 22.2656 3.52597 22.2656 5.23978C22.2656 6.26995 21.994 7.13622 21.4508 7.83861C20.917 8.53162 20.0975 9.13099 18.9925 9.63671C20.3785 10.105 21.4461 10.7699 22.1953 11.6315C23.1787 12.7647 23.6703 14.3193 23.6703 16.2953C23.6703 20.1861 20.9219 22.4021 15.4251 22.9432C15.4232 22.9182 15.419 22.8931 15.4127 22.8713L15.4002 22.8279L15.3287 22.8026C15.1214 22.7292 14.9623 22.6107 14.8508 22.4465C14.7519 22.3008 14.6354 21.9714 14.5561 21.6133C14.4965 21.3444 14.4551 21.043 14.4281 20.6833C14.4163 20.5248 14.4163 19.8543 14.4281 19.6817C14.4402 19.5047 14.4611 19.2806 14.481 19.1128C14.5024 18.9321 14.509 18.7897 14.4979 18.7489C14.4933 18.7324 14.4809 18.7101 14.4703 18.6995C14.4543 18.6835 14.4452 18.6801 14.418 18.6803C14.3998 18.6804 14.3684 18.6873 14.3476 18.6959C14.3269 18.7044 14.2916 18.7219 14.2692 18.7346C14.2099 18.7685 14.0339 18.903 13.9083 19.0105C13.8483 19.0618 13.7755 19.1185 13.7465 19.1364C13.6586 19.1906 13.5356 19.225 13.4297 19.2251C13.3947 19.2252 13.3804 19.2277 13.3804 19.2337C13.3806 19.2473 13.9886 22.6144 14.0675 23.0403C13.9726 23.0447 13.877 23.0487 13.7808 23.0522C13.4563 23.0651 13.1565 23.0757 12.8816 23.0842C12.906 23.0707 12.9255 23.0549 12.9361 23.0389C12.9528 23.0137 12.9546 23.005 12.9546 22.9488C12.9546 22.8907 12.9529 22.8833 12.929 22.8349C12.8395 22.6539 12.5428 22.565 12.2631 22.6354C12.2237 22.6453 12.1684 22.6551 12.1401 22.6572C12.0501 22.6637 12.0379 22.6515 11.9398 22.4552C11.8201 22.2158 11.78 22.1133 11.7531 21.9778C11.6936 21.6775 11.6893 21.2957 11.7422 21.0108C11.7828 20.7922 11.8603 20.5777 11.974 20.3691C12.1981 19.9579 12.5425 19.4798 12.9162 19.0613C12.9675 19.0039 12.969 19.0028 13.0329 18.9804C13.5444 18.8013 14.0775 18.4865 14.4552 18.1407C14.989 17.6521 15.2184 16.98 15.1967 15.9684C15.1853 15.4339 15.0997 14.4939 15.0186 14.0129C15.0094 13.9586 14.9792 13.8022 14.9514 13.6655C14.8784 13.3066 14.8656 13.1888 14.8655 12.8751C14.8655 12.6812 14.8716 12.5888 14.8937 12.4494C14.9235 12.2616 14.9731 12.0982 15.0575 11.9095C15.1037 11.8063 15.2789 11.4573 15.4023 11.2229C15.5957 10.8555 15.6818 10.6451 15.7334 10.4141C15.7633 10.2808 15.7731 10.1958 15.7735 10.068C15.7739 9.95402 15.7663 9.89213 15.7404 9.79845C15.7375 9.78796 15.7409 9.78242 15.754 9.77645C15.7636 9.77207 15.7715 9.76512 15.7715 9.76101C15.7715 9.75691 15.7593 9.73308 15.7445 9.70807C15.6987 9.63083 15.6937 9.59796 15.7026 9.43108C15.7111 9.27114 15.7142 9.23761 15.6999 9.21525C15.6948 9.20723 15.6874 9.20065 15.6772 9.19018C15.6591 9.17156 15.6276 9.14762 15.6074 9.13698C15.5748 9.11989 15.5633 9.11763 15.5087 9.11758C15.4496 9.11752 15.4443 9.11879 15.3883 9.14653C15.3116 9.18455 15.2786 9.21971 15.1413 9.40948C15.1264 9.43014 15.1062 9.44508 15.0664 9.465C15.0266 9.4849 15.0113 9.4962 15.0098 9.50691C15.0076 9.52262 14.9699 9.5421 14.9131 9.55688C14.8963 9.56127 14.8579 9.57796 14.828 9.59398C14.5831 9.72477 14.2787 9.80407 14.0616 9.79362C14.0223 9.79172 13.931 9.77911 13.8588 9.76559C13.7866 9.75208 13.6686 9.73327 13.5965 9.72381C13.3934 9.69712 13.297 9.68064 13.1862 9.65366C13.0985 9.63233 13.0728 9.6288 13.0056 9.6289C12.9494 9.62898 12.9148 9.63263 12.883 9.64185C12.81 9.66303 12.6759 9.71848 12.5458 9.7813C12.3299 9.88554 12.286 9.91321 11.7828 10.2619C11.3346 10.5725 11.2057 10.6454 11.0234 10.6912C10.9281 10.7152 10.865 10.7221 10.7411 10.7221C10.6441 10.7221 10.6136 10.7191 10.498 10.6982C10.0509 10.6176 9.75268 10.5917 9.56061 10.6167C9.42843 10.6339 9.1975 10.6919 9.1975 10.7078C9.1975 10.7197 9.24724 10.8363 9.27613 10.8922C9.3775 11.0883 9.51845 11.2515 9.71184 11.3967C9.95208 11.5771 10.1258 11.6612 10.3303 11.6961C10.4398 11.7149 10.6384 11.7258 10.8014 11.722L10.9381 11.7188L11.0709 11.6841C11.2342 11.6414 11.375 11.6125 11.395 11.6175C11.4382 11.6284 11.4161 11.6803 11.3151 11.806C11.2842 11.8444 11.2269 11.9075 11.1878 11.9463L11.1168 12.0167L11.1713 12.0967C11.3403 12.3447 11.4499 12.5938 11.5243 12.899C11.5811 13.1321 11.5994 13.2904 11.5934 13.4978C11.5889 13.6539 11.5781 13.7361 11.5435 13.8767C11.4512 14.2518 11.2364 14.5847 10.9142 14.8518C10.5443 15.1585 10.2282 15.2997 9.62922 15.426C9.26213 15.5033 8.77015 15.5244 8.34936 15.4809C7.80311 15.4244 7.47293 15.3551 7.16059 15.2312C6.8181 15.0953 6.47716 14.872 6.20094 14.6024C5.77389 14.1857 5.52491 13.6903 5.44595 13.0999C5.43049 12.9843 5.42846 12.6199 5.44265 12.5072C5.48727 12.1529 5.59477 11.8638 5.79215 11.5673C5.93494 11.3528 6.21253 11.0227 6.45186 10.7829C6.65169 10.5826 6.71962 10.5259 7.23894 10.1261C7.67656 9.78913 7.93004 9.58803 8.31189 9.27486C8.7656 8.90275 8.85744 8.82205 9.07178 8.60722C9.47159 8.20647 9.7179 7.90124 9.91905 7.55725C10.3615 6.80069 10.5388 5.87199 10.4032 5.02266C10.3449 4.658 10.2358 4.31287 10.0733 3.97952C9.98501 3.79837 9.91541 3.67671 9.79888 3.49987C9.53246 3.09554 9.29121 2.82883 8.81601 2.41325C8.30932 1.97014 7.91779 1.69565 7.40584 1.42462C7.33278 1.38594 7.24346 1.34062 7.20735 1.3239L7.14172 1.2935L7.11287 1.41385C6.96774 2.01943 6.82956 2.44438 6.68383 2.73336C6.57182 2.95549 6.45242 3.12692 6.1927 3.43855C5.71607 4.01043 5.35667 4.37626 4.64998 5.00887C4.41633 5.21802 4.13496 5.50312 3.94038 5.72785C3.36596 6.39131 2.9181 7.15047 2.67025 7.88088C2.38035 8.73521 2.28399 9.71808 2.39904 10.6471C2.5177 11.6053 2.87364 12.5632 3.40924 13.3657C3.59442 13.6431 3.80371 13.9125 4.04454 14.1833C4.3572 14.5348 4.81675 14.988 5.17648 15.2995C5.25235 15.3652 5.31435 15.4207 5.31425 15.4228C5.31414 15.425 5.29383 15.4358 5.26909 15.4468C5.19074 15.4818 5.08907 15.5622 4.8692 15.763C4.54906 16.0553 4.24011 16.4744 4.01964 16.9155C3.79665 17.3616 3.68444 17.7636 3.65169 18.2337C3.6365 18.4517 3.64828 18.9411 3.67972 19.3989C3.71343 19.8898 3.81456 20.5021 3.94248 20.9899C4.0129 21.2584 4.06949 21.4384 4.15772 21.6746C4.22493 21.8545 4.31982 22.1251 4.45286 22.5161C4.52204 22.7194 4.5657 22.8415 4.60225 22.9236C4.33516 22.915 4.07004 22.9063 3.80692 22.8977C3.23565 22.879 2.70184 22.8556 2.20549 22.8275C1.70913 22.8088 1.26897 22.7947 0.885004 22.7853C0.501034 22.7666 0.206033 22.7479 0 22.7291V0.351192ZM5.86391 22.9681C6.34584 22.9884 6.82145 23.0024 7.29075 23.0101C7.33608 23.0116 7.38113 23.013 7.4259 23.0144C7.40399 22.9916 7.38679 22.9579 7.36177 22.8961C7.32532 22.806 7.23871 22.6294 7.14098 22.4459C6.92729 22.0447 6.77761 21.6667 6.68711 21.2999C6.60831 20.9805 6.58426 20.7438 6.59029 20.3469C6.59422 20.0886 6.60216 19.992 6.63654 19.7847C6.70584 19.3667 6.89468 18.8297 7.09444 18.4825C7.1452 18.3943 7.15933 18.3748 7.18103 18.3629C7.22016 18.3416 7.2579 18.3585 7.30801 18.4201C7.34971 18.4713 7.40316 18.513 7.56593 18.6213C7.78852 18.7695 7.88657 18.8316 8.00781 18.9011C8.1471 18.981 8.41381 19.1152 8.54386 19.1708C8.65098 19.2167 8.74532 19.2629 8.76321 19.2783C8.77995 19.2928 8.77805 19.3221 8.75777 19.3621C8.74822 19.381 8.73143 19.4197 8.72046 19.4482C8.69693 19.5093 8.64191 19.6035 8.5847 19.6807C8.47499 19.8287 8.3088 19.9837 8.09049 20.1418C7.98344 20.2193 7.90552 20.2852 7.80545 20.3831C7.52636 20.656 7.3785 20.9267 7.33398 21.2461C7.31808 21.3602 7.32319 21.5858 7.34438 21.7053C7.38768 21.9494 7.4546 22.1274 7.58772 22.3523C7.72465 22.5837 7.77152 22.6335 7.8709 22.6529C7.89051 22.6567 8.00618 22.6622 8.12796 22.6651L8.34936 22.6703L8.38675 22.6895C8.45976 22.727 8.53066 22.8179 8.56343 22.9161C8.58341 22.976 8.58228 23.0087 8.55965 23.0266C8.54941 23.0346 8.53986 23.0404 8.52261 23.0444C8.64866 23.0473 8.77185 23.0499 8.89218 23.0522C9.38853 23.071 9.82869 23.085 10.2127 23.0944C10.5966 23.1038 11.0508 23.1084 11.5753 23.1084C11.7964 23.1084 12.0549 23.1051 12.3509 23.0984C12.3102 23.0929 12.2653 23.0867 12.2222 23.0806C12.0968 23.063 11.9846 23.0514 11.9052 23.0479C11.7831 23.0426 11.7487 23.0354 11.7346 23.0125C11.7319 23.0082 11.7294 22.9844 11.729 22.9596C11.7284 22.9206 11.724 22.9055 11.6965 22.8486C11.6325 22.7162 11.5146 22.5417 11.2561 22.1968C11.0425 21.9117 11.0059 21.8494 10.9183 21.6217C10.7434 21.1668 10.6444 20.8066 10.5912 20.4312C10.5621 20.2257 10.5566 20.1356 10.5567 19.8691C10.5569 19.473 10.5851 19.2274 10.68 18.7959C10.7318 18.5603 10.7652 18.4755 10.8857 18.2738C10.9919 18.0961 11.0171 18.0358 11.0025 17.994C10.9987 17.9831 10.9872 17.9693 10.977 17.9632C10.9444 17.944 10.8098 17.8959 10.7775 17.892C10.7218 17.8852 10.6879 17.9148 10.6452 18.0076C10.6135 18.0767 10.602 18.1196 10.5395 18.4008C10.4269 18.9077 10.3855 19.0416 10.3252 19.0946C10.2035 19.2015 10.0053 19.1888 9.48834 19.0408C8.88476 18.868 8.59135 18.7529 8.10289 18.4975C7.75789 18.317 7.64606 18.2436 7.45374 18.0709C7.30173 17.9344 7.14029 17.7755 6.96974 17.5944L6.79744 17.4114L6.78154 17.4665C6.75605 17.5548 6.71038 17.6765 6.58687 17.9852C6.35396 18.5672 6.27397 18.7336 6.13037 18.9348C6.04185 19.0589 5.98116 19.1244 5.59016 19.5182C5.15314 19.9583 5.03382 20.0924 4.90921 20.2836C4.80673 20.4408 4.72563 20.6702 4.68717 20.9115C4.66897 21.0258 4.66201 21.2727 4.67354 21.3954C4.69237 21.5956 4.72975 21.764 4.80665 21.9948C4.93832 22.3901 5.01417 22.5446 5.11346 22.6198C5.19998 22.6853 5.29176 22.6936 5.44387 22.6494C5.55955 22.6158 5.60864 22.6141 5.66501 22.6417C5.76978 22.693 5.84952 22.8266 5.86391 22.9681ZM26.5782 0.351192H42.719V6.70074H35.3159V8.7798H42.719V14.9046H35.3159V22.7853H26.5782V0.351192ZM45.1773 0.351192H48.3943L59.2391 10.5358L70.3789 0.351192H73.4834V22.7853H64.2541V15.5086L58.5226 21.802L52.9457 15.6772V22.7853H45.1773V0.351192ZM14.9493 10.7999C15.0156 10.5968 15.0532 10.4082 15.0731 10.1787C15.0755 10.1515 15.0765 10.1293 15.0753 10.1294C15.0742 10.1294 15.0288 10.1648 14.9744 10.208C14.6365 10.4766 14.3428 10.6513 13.881 10.8582C13.57 10.9976 13.3128 11.1377 13.0601 11.3052C12.8445 11.4482 12.6967 11.5958 12.5527 11.8119C12.3067 12.1813 12.214 12.5904 12.2773 13.0282C12.2849 13.0806 12.2924 13.1247 12.294 13.1264C12.298 13.1303 12.3807 13.0753 12.4607 13.0155C12.5616 12.94 12.6533 12.8589 12.7753 12.7369C12.8371 12.6751 12.8977 12.6193 12.9099 12.613C12.9352 12.5999 12.9605 12.6035 12.969 12.6212C12.9721 12.6278 12.9749 12.7635 12.975 12.9228C12.9753 13.2349 12.9768 13.2524 13.0164 13.41C13.0522 13.5521 13.1373 13.8021 13.2171 13.9995C13.3128 14.2364 13.4505 14.52 13.606 14.8007C13.7623 15.0828 13.8489 15.3193 13.9151 15.6448C14.0354 16.236 13.9836 16.8369 13.7645 17.3908C13.6061 17.7912 13.3916 18.1199 13.0704 18.4547C13.0329 18.4937 13.0068 18.5231 13.0125 18.5199C13.0181 18.5167 13.0641 18.4865 13.1146 18.4528C13.6192 18.1168 14.0315 17.7104 14.2944 17.2902C14.5874 16.8218 14.6976 16.3707 14.6863 15.6862C14.6794 15.2634 14.6567 15.1342 14.4534 14.357C14.3546 13.9797 14.3108 13.65 14.3022 13.2192C14.2973 12.9747 14.3123 12.6042 14.3379 12.3368C14.3767 11.9312 14.4745 11.6509 14.6935 11.3168C14.8293 11.1097 14.8851 10.997 14.9493 10.7999Z"
                fill="white"
              />
            </svg>

            <p className="text-[#777E90] text-sm my-4">
              The goal of Black Fox Metaverse, the company we formed, is to completely transform the NFT e-commerce sector. We are a rapidly
              expanding platform with a vibrant vision for our artists, constantly exploring fresh approaches to push the limits of what is
              practical in the NFT e-commerce sector.
            </p>

            <div className="flex pr-0 lg:pr-32 justify-start my-4 md:my-10 ">
              <form className="w-full text-sm  z-50 relative">
                <input
                  type="text"
                  id="default-search"
                  class=" w-full text-[10px]  sm:text-xs lg:text-sm p-3 md:p-4  z-50  pl-4 lg:pl-10  text-gray-900 border border-[#000000]/40 rounded-full bg-gray-50 focus:ring-gray-900 focus:border-gray-900 "
                  placeholder="Email Address"
                  required
                />
                <button type="submit" class="text-white absolute right-4 w-8 lg:w-10  h-8  lg:h-10  lg:top-1.5 top-2.5  ">
                  <svg viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.9974 25.7747C7.55407 25.7747 2.33073 20.5514 2.33073 14.1081C2.33073 7.66475 7.55407 2.44141 13.9974 2.44141C20.4407 2.44141 25.6641 7.66475 25.6641 14.1081C25.6641 20.5514 20.4407 25.7747 13.9974 25.7747Z"
                      fill="#0368FF"
                      stroke="#0368FF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path d="M9.91406 14.1094H16.9141" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M14.5859 10.6094L18.0859 14.1094L14.5859 17.6094"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <ul>
              <div className="flex gap-6 pb-5">
                <a target={"_blank"} rel="noreferrer" href="https://www.instagram.com/blackfoxmetaverse/">
                  <FaInstagram className="text-2xl  text-white cursor-pointer hover:text-pink-500" />
                </a>
                <a target={"_blank"} rel="noreferrer" href="https://twitter.com/fox_metaverse/">
                  <FaTwitter className="text-2xl text-white  cursor-pointer hover:text-blue-400" />
                </a>

                <a target={"_blank"} rel="noreferrer" href="https://www.linkedin.com/showcase/black-fox-metaverse/?viewAsMember=true">
                  <FaLinkedin className="text-2xl  text-white cursor-pointer hover:text-blue-500" />
                </a>

                <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/@BlackFoxMetaverse/featured">
                  <FaYoutube className="text-2xl text-white  cursor-pointer hover:text-red-600" />
                </a>

                <BsReddit className="text-2xl text-white  cursor-pointer hover:text-red-600" />
                
                <BsDiscord className="text-2xl  text-white cursor-pointer hover:text-blue-500"/>
              </div>
            </ul>
            <div className="flex  items-center gap-4">
              <p className="text-[#777E90] text-md ">Terms</p>
              <p className="text-[#777E90] text-md ">Privacy Policy</p>
            </div>
          </div>
          <div className="grid grid-cols-2  w-full col-span-7 lg:col-span-4 md:grid-cols-4">
            <FooterColumn heading={"BFM"} content={["Explore", "All NFTs", "About"]}></FooterColumn>
            <FooterColumn
              heading={"Personal"}
              content={["Profile", "Favourites", "Watchlist", "My collections", "Settings"]}
            ></FooterColumn>
            <FooterColumn heading={"Resources"} content={["Platform status", "Partners", "Taxes", "Newsletter"]}></FooterColumn>
            <FooterColumn heading={"Community"} content={["Help Center", "BFM Token", "suggest Feature","Subscribe"]}></FooterColumn>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#65676B]/50"></div>
        <div className="flex md:flex-row flex-col px-20 justify-center  py-6 gap-4">
          <p className="text-center text-white">© BlackFoxMetaverse, Inc @ All Rights Reserved</p>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
