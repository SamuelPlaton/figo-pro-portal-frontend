import { Drawer } from '@/components';
import { useToast } from '@/context/toast-context';
import { ElementType } from 'react';

interface LinkSharingDrawerProps {
  onClose: () => void;
  isOpen: boolean;
  link: string;
}

interface LinkOption {
  onClick?: () => void;
  href?: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export default function LinkSharingDrawer({ onClose, isOpen, link }: LinkSharingDrawerProps) {
  const { addToast } = useToast();

  const getEncodedUri = () => {
    return encodeURIComponent(link);
  };

  const getEncodedSubject = () => {
    return encodeURIComponent("Découvrez l'assurance Figo !");
  };

  const getEncodedBody = () => {
    const message = `
Salut 👋,

Je voulais te recommander une super assurance pour animaux 🐶🐱 !
Ils sont fiables, simples à utiliser et ça peut vraiment être utile.
          
Tu peux découvrir ici 👉 ${link}
          
À bientôt !
`;

    return encodeURIComponent(message.trim());
  };

  const linkOptions: LinkOption[] = [
    {
      label: 'Copier le lien',
      icon: <CopyLinkIcon />,
      onClick: async () => {
        await navigator.clipboard.writeText(link);
        addToast('Lien copié dans le presse-papier', 'success');
      },
    },
    {
      label: 'Email',
      icon: <EmailIcon />,
      href: `mailto:?subject=${getEncodedSubject()}&Body=${getEncodedBody()}`,
    },
    {
      label: 'Gmail',
      icon: <GmailIcon />,
      href: `https://mail.google.com/mail/?view=cm&to=&su=${getEncodedSubject()}&body=${getEncodedBody()}`,
    },
    {
      label: 'Outlook',
      icon: <OutlookIcon />,
      href: `https://outlook.live.com/mail/0/deeplink/compose?subject=${getEncodedSubject()}&body=${getEncodedBody()}`,
    },
    {
      label: 'Facebook',
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: `https://api.whatsapp.com/send?text=${getEncodedBody()}`,
    },
    {
      label: 'Messenger',
      icon: <MessengerIcon />,
      href: `fb-messenger://share/?link=${encodeURIComponent(link)}`,
      className: 'md:hidden',
    },
  ];

  const displayOption = (option: LinkOption) => {
    const Component: ElementType = option.href ? 'a' : 'button';
    return (
      <Component
        href={option.href}
        onClick={option.onClick}
        key={option.label}
        className={`flex items-center gap-2 p-3 justify-between rounded-xl border border-gray font-bold cursor-pointer ${option.className || ''}`}
        target="_blank"
      >
        <span>{option.label}</span>
        <div>{option.icon}</div>
      </Component>
    );
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="text-lg font-bold">
          Invitez des propriétaires d&#39;animaux dès maintenant !
        </span>
        <span>Choisissez votre méthode de recommandations</span>
        {linkOptions.map(option => displayOption(option))}
      </div>
    </Drawer>
  );
}

function CopyLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 22 23" fill="none">
      <path
        d="M3 15.5796C1.9 15.5796 1 14.6796 1 13.5796V3.57959C1 2.47959 1.9 1.57959 3 1.57959H13C14.1 1.57959 15 2.47959 15 3.57959M9 7.57959H19C20.1046 7.57959 21 8.47502 21 9.57959V19.5796C21 20.6842 20.1046 21.5796 19 21.5796H9C7.89543 21.5796 7 20.6842 7 19.5796V9.57959C7 8.47502 7.89543 7.57959 9 7.57959Z"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M16 8.5796V13.5796C16 14.3752 16.3161 15.1383 16.8787 15.7009C17.4413 16.2635 18.2044 16.5796 19 16.5796C19.7957 16.5796 20.5587 16.2635 21.1213 15.7009C21.6839 15.1383 22 14.3752 22 13.5796V12.5796C22 10.3269 21.2394 8.1402 19.8414 6.37377C18.4434 4.60734 16.49 3.36467 14.2975 2.84711C12.1051 2.32955 9.80215 2.5674 7.76178 3.52215C5.72141 4.47689 4.06318 6.09259 3.05574 8.10746C2.0483 10.1223 1.75069 12.4183 2.21111 14.6235C2.67154 16.8286 3.86303 18.8137 5.59254 20.2571C7.32205 21.7005 9.48825 22.5177 11.7402 22.5762C13.9921 22.6348 16.1979 21.9312 18 20.5796M16 12.5796C16 14.7887 14.2091 16.5796 12 16.5796C9.79086 16.5796 8 14.7887 8 12.5796C8 10.3705 9.79086 8.57959 12 8.57959C14.2091 8.57959 16 10.3705 16 12.5796Z"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22" fill="none">
      <path
        d="M1.90932 21.082H6.36382V10.2639L0.000244141 5.49121V19.1729C0.000244141 20.2293 0.856146 21.082 1.90932 21.082Z"
        fill="#4285F4"
      />
      <path
        d="M21.6365 21.082H26.091C27.1475 21.082 28 20.2261 28 19.1729V5.49121L21.6365 10.2639"
        fill="#34A853"
      />
      <path
        d="M21.6365 1.99115V10.2638L28 5.49112V2.94569C28 0.584799 25.3051 -0.761098 23.4183 0.654797"
        fill="#FBBC04"
      />
      <path
        d="M6.36401 10.2639V1.99121L14.0003 7.71842L21.6365 1.99121V10.2639L14.0003 15.9911"
        fill="#EA4335"
      />
      <path
        d="M0 2.94569V5.49112L6.36357 10.2638V1.99115L4.58178 0.654797C2.6918 -0.761098 0 0.584799 0 2.94569Z"
        fill="#C5221F"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 32 33" fill="none">
      <g clipPath="url(#clip0_3144_282)">
        <path
          d="M32 16.5796C32 7.74311 24.8365 0.57959 16 0.57959C7.16352 0.57959 0 7.74311 0 16.5796C0 24.083 5.16608 30.3793 12.135 32.1086V21.4692H8.83584V16.5796H12.135V14.4727C12.135 9.02695 14.5997 6.50279 19.9462 6.50279C20.96 6.50279 22.7091 6.70183 23.4246 6.90023V11.3322C23.047 11.2926 22.391 11.2727 21.5763 11.2727C18.953 11.2727 17.9392 12.2666 17.9392 14.8503V16.5796H23.1654L22.2675 21.4692H17.9392V32.4625C25.8618 31.5057 32.0006 24.7601 32.0006 16.5796H32Z"
          fill="#0866FF"
        />
        <path
          d="M22.2664 21.4703L23.1643 16.5807H17.9381V14.8514C17.9381 12.2677 18.9518 11.2738 21.5752 11.2738C22.3899 11.2738 23.0459 11.2937 23.4235 11.3333V6.90135C22.708 6.70231 20.9589 6.50391 19.9451 6.50391C14.5986 6.50391 12.1339 9.02807 12.1339 14.4738V16.5807H8.83472V21.4703H12.1339V32.1097C13.3717 32.4169 14.6664 32.5807 15.9989 32.5807C16.6549 32.5807 17.3019 32.5404 17.9374 32.4636V21.4703H22.2658H22.2664Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3144_282">
          <rect width="32" height="32" fill="white" transform="translate(0 0.57959)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 32 33" fill="none">
      <path
        d="M0 32.5795L2.24933 24.3622C0.861331 21.9569 0.132 19.2302 0.133333 16.4342C0.137333 7.69291 7.25065 0.57959 15.9906 0.57959C20.232 0.580923 24.2133 2.23292 27.2079 5.23025C30.2013 8.22757 31.8493 12.2116 31.8479 16.4489C31.8439 25.1915 24.7306 32.3049 15.9906 32.3049C13.3373 32.3035 10.7226 31.6382 8.40665 30.3742L0 32.5795ZM8.79598 27.5035C11.0306 28.8302 13.164 29.6249 15.9853 29.6262C23.2493 29.6262 29.1666 23.7142 29.1706 16.4462C29.1733 9.16357 23.2839 3.25958 15.996 3.25692C8.72665 3.25692 2.81333 9.1689 2.81066 16.4356C2.80933 19.4022 3.67866 21.6235 5.13866 23.9475L3.80666 28.8115L8.79598 27.5035ZM23.9786 20.2182C23.8799 20.0529 23.6159 19.9542 23.2186 19.7555C22.8226 19.5569 20.8746 18.5982 20.5106 18.4662C20.148 18.3342 19.884 18.2676 19.6186 18.6649C19.3546 19.0609 18.5946 19.9542 18.364 20.2182C18.1333 20.4822 17.9013 20.5155 17.5053 20.3169C17.1093 20.1182 15.832 19.7009 14.3186 18.3502C13.1413 17.2996 12.3453 16.0022 12.1146 15.6049C11.884 15.2089 12.0906 14.9942 12.288 14.7969C12.4666 14.6196 12.684 14.3342 12.8826 14.1022C13.084 13.8729 13.1493 13.7076 13.2826 13.4422C13.4146 13.1782 13.3493 12.9462 13.2493 12.7476C13.1493 12.5502 12.3573 10.5996 12.028 9.80624C11.7053 9.03424 11.3786 9.13824 11.136 9.12624L10.376 9.1129C10.112 9.1129 9.68264 9.21157 9.31998 9.6089C8.95731 10.0062 7.93332 10.9636 7.93332 12.9142C7.93332 14.8649 9.35331 16.7489 9.55064 17.0129C9.74931 17.2769 12.344 21.2795 16.3186 22.9955C17.264 23.4035 18.0026 23.6475 18.5773 23.8302C19.5266 24.1315 20.3906 24.0889 21.0733 23.9875C21.8346 23.8742 23.4173 23.0289 23.7479 22.1035C24.0786 21.1769 24.0786 20.3835 23.9786 20.2182Z"
        fill="#25D366"
      />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 32 33" fill="none">
      <path
        d="M16 0.579102C6.988 0.579102 0 7.1831 0 16.0991C0 20.7631 1.912 24.7951 5.024 27.5791C5.284 27.8111 5.444 28.1391 5.452 28.4911L5.54 31.3391C5.54641 31.5487 5.60419 31.7534 5.70827 31.9354C5.81234 32.1174 5.95953 32.271 6.13689 32.3828C6.31425 32.4946 6.51635 32.5611 6.72544 32.5765C6.93452 32.5919 7.14418 32.5557 7.336 32.4711L10.512 31.0711C10.78 30.9511 11.084 30.9311 11.368 31.0071C12.828 31.4071 14.38 31.6231 16 31.6231C25.012 31.6231 32 25.0191 32 16.1031C32 7.1871 25.012 0.579102 16 0.579102Z"
        fill="url(#paint0_radial_3144_298)"
      />
      <path
        d="M6.39226 20.6394L11.0923 13.1834C11.2691 12.9027 11.5022 12.6617 11.7768 12.4756C12.0514 12.2895 12.3617 12.1624 12.688 12.1022C13.0142 12.0421 13.3494 12.0502 13.6723 12.1262C13.9953 12.2021 14.299 12.3442 14.5643 12.5434L18.3043 15.3474C18.4712 15.4724 18.6744 15.5396 18.8829 15.5389C19.0915 15.5382 19.2942 15.4695 19.4603 15.3434L24.5083 11.5114C25.1803 10.9994 26.0603 11.8074 25.6123 12.5234L20.9083 19.9754C20.7315 20.2561 20.4984 20.4971 20.2237 20.6832C19.9491 20.8693 19.6388 20.9964 19.3126 21.0566C18.9863 21.1167 18.6511 21.1085 18.3282 21.0326C18.0052 20.9567 17.7015 20.8146 17.4363 20.6154L13.6963 17.8114C13.5293 17.6864 13.3262 17.6192 13.1176 17.6199C12.909 17.6206 12.7064 17.6892 12.5403 17.8154L7.49226 21.6474C6.82026 22.1594 5.94026 21.3554 6.39226 20.6394Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_3144_298"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(5.36 32.5791) scale(35.2 35.2)"
        >
          <stop stopColor="#0099FF" />
          <stop offset="0.6" stopColor="#A033FF" />
          <stop offset="0.9" stopColor="#FF5280" />
          <stop offset="1" stopColor="#FF7061" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g clipPath="url(#clip0_3144_235)">
        <g style={{ mixBlendMode: 'multiply' }} opacity="0.2">
          <rect
            x="5.99927"
            y="1.92188"
            width="24.7587"
            height="28.4894"
            fill="url(#pattern0_3144_235)"
          />
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.2">
            <path
              d="M29.1329 14.9088V26.2848C29.1329 26.6595 28.984 27.019 28.719 27.284C28.454 27.549 28.0946 27.6979 27.7198 27.6979H9.02356C8.64876 27.6979 8.28932 27.549 8.0243 27.284C7.75928 27.019 7.61039 26.6595 7.61039 26.2848V14.9088C7.60697 15.0165 7.63442 15.1229 7.68951 15.2156C7.74459 15.3082 7.82501 15.3832 7.92129 15.4316L9.17901 16.1382V3.41971C9.17141 3.25451 9.19648 3.08943 9.25276 2.93392C9.30905 2.77842 9.39545 2.63553 9.50703 2.51346C9.6186 2.39139 9.75315 2.29252 9.90298 2.22251C10.0528 2.1525 10.215 2.11273 10.3802 2.10547H26.349C26.6802 2.12374 26.9907 2.2721 27.213 2.51825C27.4354 2.76439 27.5515 3.08839 27.536 3.41971V16.1382L28.8079 15.4316C28.9047 15.3825 28.9862 15.3078 29.0435 15.2156C29.1008 15.1234 29.1317 15.0173 29.1329 14.9088Z"
              fill="white"
            />
          </g>
        </g>
        <g style={{ mixBlendMode: 'multiply' }} opacity="0.12">
          <rect
            x="6.83252"
            y="1.73877"
            width="23.0629"
            height="26.7936"
            fill="url(#pattern1_3144_235)"
          />
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.12">
            <path
              d="M29.1327 14.9097V26.2857C29.1327 26.6605 28.9838 27.02 28.7188 27.285C28.4538 27.55 28.0943 27.6989 27.7195 27.6989H9.02331C8.64852 27.6989 8.28907 27.55 8.02405 27.285C7.75903 27.02 7.61015 26.6605 7.61015 26.2857V14.9097C7.60673 15.0175 7.63418 15.1239 7.68926 15.2166C7.74435 15.3092 7.82477 15.3842 7.92104 15.4326L9.17876 16.1392V3.42069C9.17117 3.25549 9.19623 3.09041 9.25252 2.9349C9.30881 2.77939 9.39521 2.63651 9.50678 2.51444C9.61835 2.39236 9.75291 2.29349 9.90274 2.22349C10.0526 2.15348 10.2147 2.1137 10.38 2.10645H26.3487C26.6799 2.12472 26.9905 2.27308 27.2128 2.51922C27.4351 2.76537 27.5512 3.08937 27.5358 3.42069V16.1392L28.8077 15.4326C28.9045 15.3835 28.986 15.3088 29.0433 15.2166C29.1006 15.1244 29.1315 15.0183 29.1327 14.9097Z"
              fill="white"
            />
          </g>
        </g>
        <path
          d="M29.1332 14.9095C29.1334 14.8041 29.1061 14.7005 29.054 14.6088C29.002 14.5171 28.927 14.4406 28.8365 14.3866L19.9194 8.73396L19.8346 8.67743C19.6467 8.5892 19.4416 8.54346 19.234 8.54346C19.0264 8.54346 18.8213 8.5892 18.6334 8.67743L18.5062 8.76222L8.79775 14.4149C8.70518 14.4666 8.62856 14.5426 8.57624 14.6348C8.52391 14.727 8.49788 14.8318 8.50098 14.9378C8.50124 15.0467 8.5301 15.1536 8.58466 15.2478C8.63922 15.3421 8.71757 15.4203 8.81188 15.4748L18.5203 21.1274L18.6475 21.2122C18.8354 21.3005 19.0405 21.3462 19.2481 21.3462C19.4557 21.3462 19.6608 21.3005 19.8487 21.2122L19.9759 21.1274L28.893 15.4748C28.9785 15.4094 29.0457 15.323 29.0878 15.2239C29.1299 15.1248 29.1455 15.0165 29.1332 14.9095Z"
          fill="#123B6D"
        />
        <path d="M15.5943 11.7295H9.22095V17.5659H15.5943V11.7295Z" fill="#0364B8" />
        <path
          d="M27.5352 6.14727V3.49052C27.5506 3.15919 27.4345 2.83519 27.2122 2.58905C26.9899 2.3429 26.6793 2.19455 26.3481 2.17627H10.4218C10.2565 2.18353 10.0944 2.2233 9.94454 2.29331C9.79471 2.36332 9.66016 2.46219 9.54858 2.58426C9.43701 2.70634 9.35061 2.84921 9.29432 3.00472C9.23804 3.16023 9.21297 3.32531 9.22056 3.49052V6.14727H27.5352Z"
          fill="#0358A7"
        />
        <path d="M15.5943 6.14746H9.22095V11.7153H15.5943V6.14746Z" fill="#0078D4" />
        <path d="M21.9681 6.14746H15.5947V11.7153H21.9681V6.14746Z" fill="#28A8EA" />
        <path d="M27.5357 6.14746H21.9678V11.7153H27.5357V6.14746Z" fill="#50D9FF" />
        <path d="M27.5357 11.7295H21.9678V17.5659H27.5357V11.7295Z" fill="#28A8EA" />
        <path d="M21.9681 11.7295H15.5947V17.5659H21.9681V11.7295Z" fill="#0078D4" />
        <path d="M21.9681 17.5659H15.5947V23.4023H21.9681V17.5659Z" fill="#0364B8" />
        <path d="M15.5943 17.5659H9.22095V22.8794H15.5943V17.5659Z" fill="#14447D" />
        <path d="M27.5357 17.5659H21.9678V23.4023H27.5357V17.5659Z" fill="#0078D4" />
        <g opacity="0.35">
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.35">
            <rect
              x="-0.21875"
              y="6.89648"
              width="37.3076"
              height="28.1503"
              fill="url(#pattern2_3144_235)"
            />
            <g style={{ mixBlendMode: 'multiply' }} opacity="0.35">
              <path
                d="M28.8217 15.4321L19.5513 21.0847L19.41 21.1695C19.2183 21.2621 19.0081 21.3102 18.7952 21.3102C18.5823 21.3102 18.3722 21.2621 18.1805 21.1695L18.0392 21.0847L7.97744 15.4321C7.88116 15.3836 7.80074 15.3086 7.74566 15.216C7.69058 15.1234 7.66313 15.0169 7.66654 14.9092V26.2852C7.66654 26.66 7.81543 27.0194 8.08045 27.2844C8.34547 27.5495 8.70492 27.6983 9.07971 27.6983H27.7335C28.1083 27.6983 28.4678 27.5495 28.7328 27.2844C28.9978 27.0194 29.1467 26.66 29.1467 26.2852V14.9092C29.1455 15.0177 29.1146 15.1239 29.0573 15.2161C29 15.3082 28.9185 15.383 28.8217 15.4321Z"
                fill="white"
              />
            </g>
          </g>
        </g>
        <g opacity="0.06">
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.06">
            <rect
              x="6.8335"
              y="13.9482"
              width="23.0629"
              height="14.2447"
              fill="url(#pattern3_3144_235)"
            />
            <g style={{ mixBlendMode: 'multiply' }} opacity="0.06">
              <path
                d="M28.8221 15.4321L19.5518 21.0847L19.4104 21.1695C19.2188 21.2621 19.0086 21.3102 18.7957 21.3102C18.5828 21.3102 18.3727 21.2621 18.181 21.1695L18.0397 21.0847L7.97793 15.4321C7.88165 15.3836 7.80123 15.3086 7.74615 15.216C7.69106 15.1234 7.66361 15.0169 7.66703 14.9092V26.2852C7.66703 26.66 7.81592 27.0194 8.08094 27.2844C8.34596 27.5495 8.7054 27.6983 9.0802 27.6983H27.734C28.1088 27.6983 28.4682 27.5495 28.7333 27.2844C28.9983 27.0194 29.1472 26.66 29.1472 26.2852V14.9092C29.146 15.0177 29.1151 15.1239 29.0577 15.2161C29.0004 15.3082 28.919 15.383 28.8221 15.4321Z"
                fill="white"
              />
            </g>
          </g>
        </g>
        <path
          d="M28.8217 15.4321L19.5513 21.0847L19.41 21.1695C19.2183 21.2621 19.0081 21.3102 18.7952 21.3102C18.5823 21.3102 18.3722 21.2621 18.1805 21.1695L18.0392 21.0847L7.97744 15.4321C7.88116 15.3836 7.80074 15.3086 7.74566 15.216C7.69058 15.1234 7.66313 15.0169 7.66654 14.9092V26.2852C7.66654 26.66 7.81543 27.0194 8.08045 27.2844C8.34547 27.5495 8.70492 27.6983 9.07971 27.6983H27.7335C28.1083 27.6983 28.4678 27.5495 28.7328 27.2844C28.9978 27.0194 29.1467 26.66 29.1467 26.2852V14.9092C29.1455 15.0177 29.1146 15.1239 29.0573 15.2161C29 15.3082 28.9185 15.383 28.8217 15.4321Z"
          fill="url(#paint0_linear_3144_235)"
        />
        <path
          d="M9.00944 27.6277H27.7622C28.0518 27.6229 28.333 27.5291 28.5677 27.3592L18.0537 20.9434L17.9124 20.8586L8.02023 15.0788L7.63867 14.9092V26.2145C7.63851 26.5821 7.78156 26.9352 8.03748 27.1991C8.2934 27.4629 8.64205 27.6167 9.00944 27.6277Z"
          fill="url(#paint1_linear_3144_235)"
        />
        <g style={{ mixBlendMode: 'multiply' }} opacity="0.48">
          <rect
            x="-1.44824"
            y="6.00635"
            width="20.0104"
            height="20.0104"
            fill="url(#pattern4_3144_235)"
          />
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.48">
            <path
              d="M14.3932 7.74463H2.46609C1.80269 7.74463 1.26489 8.28242 1.26489 8.94582V20.8729C1.26489 21.5363 1.80269 22.0741 2.46609 22.0741H14.3932C15.0566 22.0741 15.5944 21.5363 15.5944 20.8729V8.94582C15.5944 8.28242 15.0566 7.74463 14.3932 7.74463Z"
              fill="white"
            />
          </g>
        </g>
        <g style={{ mixBlendMode: 'multiply' }} opacity="0.24">
          <rect
            x="0.897949"
            y="7.33447"
            width="15.2622"
            height="15.2622"
            fill="url(#pattern5_3144_235)"
          />
          <g style={{ mixBlendMode: 'multiply' }} opacity="0.24">
            <path
              d="M14.3932 7.74463H2.46609C1.80269 7.74463 1.26489 8.28242 1.26489 8.94582V20.8729C1.26489 21.5363 1.80269 22.0741 2.46609 22.0741H14.3932C15.0566 22.0741 15.5944 21.5363 15.5944 20.8729V8.94582C15.5944 8.28242 15.0566 7.74463 14.3932 7.74463Z"
              fill="white"
            />
          </g>
        </g>
        <path
          style={{ mixBlendMode: 'soft-light' }}
          opacity="0.75"
          d="M29.1325 14.9089C29.1327 14.8035 29.1054 14.6999 29.0533 14.6082C29.0013 14.5165 28.9263 14.44 28.8358 14.386L27.5498 13.6512V3.49052C27.5652 3.15919 27.4491 2.83519 27.2268 2.58905C27.0044 2.3429 26.6939 2.19455 26.3627 2.17627H10.4222C10.257 2.18353 10.0948 2.2233 9.94497 2.29331C9.79514 2.36332 9.66059 2.46219 9.54902 2.58426C9.43744 2.70634 9.35104 2.84921 9.29476 3.00472C9.23847 3.16023 9.21341 3.32531 9.221 3.49052V16.209L7.96328 15.5024C7.867 15.454 7.78658 15.379 7.7315 15.2864C7.67642 15.1937 7.64897 15.0873 7.65238 14.9796V26.3556C7.65238 26.7304 7.80127 27.0898 8.06629 27.3548C8.33131 27.6198 8.69076 27.7687 9.06555 27.7687H27.7335C28.1083 27.7687 28.4677 27.6198 28.7327 27.3548C28.9978 27.0898 29.1467 26.7304 29.1467 26.3556V14.9089H29.1325Z"
          fill="url(#paint2_linear_3144_235)"
        />
        <path
          d="M14.3932 7.74463H2.46609C1.80269 7.74463 1.26489 8.28242 1.26489 8.94582V20.8729C1.26489 21.5363 1.80269 22.0741 2.46609 22.0741H14.3932C15.0566 22.0741 15.5944 21.5363 15.5944 20.8729V8.94582C15.5944 8.28242 15.0566 7.74463 14.3932 7.74463Z"
          fill="#0F78D4"
        />
        <g style={{ mixBlendMode: 'soft-light' }} opacity="0.5">
          <path
            style={{ mixBlendMode: 'soft-light' }}
            opacity="0.5"
            d="M14.3932 7.74463H2.46609C1.80269 7.74463 1.26489 8.28242 1.26489 8.94582V20.8729C1.26489 21.5363 1.80269 22.0741 2.46609 22.0741H14.3932C15.0566 22.0741 15.5944 21.5363 15.5944 20.8729V8.94582C15.5944 8.28242 15.0566 7.74463 14.3932 7.74463Z"
            fill="url(#paint3_linear_3144_235)"
          />
        </g>
        <path
          d="M5.19326 12.9449C5.46239 12.3546 5.90637 11.8613 6.46511 11.5317C7.09109 11.1709 7.80637 10.9945 8.52833 11.023C9.18633 11.0139 9.83492 11.1797 10.4078 11.5035C10.9503 11.8404 11.3787 12.3328 11.6373 12.9166C11.9411 13.531 12.0914 14.2099 12.0754 14.8951C12.0924 15.6076 11.9424 16.3142 11.6373 16.9583C11.3472 17.5389 10.9021 18.028 10.3513 18.3715C9.76242 18.708 9.09343 18.8789 8.41528 18.8661C7.74157 18.8792 7.07706 18.7081 6.49337 18.3715C5.9551 18.0525 5.51883 17.5869 5.23565 17.0289C4.93408 16.4188 4.78381 15.7451 4.79757 15.0646C4.75772 14.3366 4.89343 13.6096 5.19326 12.9449ZM6.60643 16.2517C6.74723 16.6203 6.99286 16.9396 7.31301 17.1703C7.64453 17.4 8.04032 17.5187 8.44354 17.5094C8.8654 17.5269 9.28165 17.408 9.6306 17.1703C9.94952 16.9324 10.1945 16.609 10.3372 16.2376C10.483 15.8198 10.5547 15.3799 10.5492 14.9375C10.5512 14.4964 10.4845 14.0578 10.3513 13.6373C10.2232 13.258 9.98756 12.9241 9.673 12.6764C9.33311 12.4176 8.9126 12.2874 8.48594 12.309C8.07831 12.2996 7.67799 12.4182 7.34127 12.6481C7.01192 12.8821 6.75683 13.2059 6.60643 13.5808C6.26718 14.4388 6.26718 15.3937 6.60643 16.2517Z"
          fill="white"
        />
      </g>
      <defs>
        <pattern
          id="pattern0_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_3144_235" transform="scale(0.0135135 0.0117647)" />
        </pattern>
        <pattern
          id="pattern1_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image1_3144_235" transform="scale(0.0144928 0.0125)" />
        </pattern>
        <pattern
          id="pattern2_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image2_3144_235" transform="scale(0.00900901 0.0119048)" />
        </pattern>
        <pattern
          id="pattern3_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image3_3144_235" transform="scale(0.0144928 0.0232558)" />
        </pattern>
        <pattern
          id="pattern4_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image4_3144_235" transform="scale(0.0166667)" />
        </pattern>
        <pattern
          id="pattern5_3144_235"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image5_3144_235" transform="scale(0.0217391)" />
        </pattern>
        <linearGradient
          id="paint0_linear_3144_235"
          x1="25.7409"
          y1="12.0687"
          x2="10.9592"
          y2="29.6909"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#35B8F1" />
          <stop offset="0.9" stopColor="#0F78D1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3144_235"
          x1="18.0961"
          y1="14.9092"
          x2="18.0961"
          y2="27.6418"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#35B8F1" />
          <stop offset="1" stopColor="#28A8EA" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3144_235"
          x1="10.2243"
          y1="2.11974"
          x2="25.7551"
          y2="29.0123"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3144_235"
          x1="3.75207"
          y1="6.81194"
          x2="13.1072"
          y2="23.0068"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopOpacity="0.7" />
        </linearGradient>
        <clipPath id="clip0_3144_235">
          <rect width="32" height="32" fill="white" transform="translate(0 0.57959)" />
        </clipPath>
        <image
          id="image0_3144_235"
          width="74"
          height="85"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABVCAYAAADuUHI/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAD5UlEQVR4Xu2d3W7bRhBGz8qyZMWp46aN3BYtChRJkbxA3v8xivYmQd2foH9WXSSS4nB78e2YtCyTkwK94GYOIAgmaRhzPLsk4E/jlHPGS0opDV0zFvL7FA4kz/VF0AQ4KO9jFpaBBngHNF5hvaKKoAQcAkfAApgjYWOUlZGgDfAGWANvUYP1Cpv2nUQy5sAJ8Ag4Ax6UYyZxLOTy2gAr4BXwG/B3OfbfRJVuOkSSvgKeAk+QrHtoCY6NBniNJP0AfAf8CFyklLZ9XdXXURO03B4hSc+BZ0jUEeMVtUaiPi7H1uV1hZblXvaKKt10gDrnDHXSM+Ax+gGHjGvZGRntSR+Vr/8CfgH+AN6klO7c3Ic6aob2pDNgiSQdI4ljZVbel7R77oyBFdInyrpqju52C9RJY73jGQeoDqvJdRcf2mdqen7q8t51DYkKCiHKSYhyEqKchCgnIcpJiHISopyEKCchykmIchKinIQoJyHKSYhyEqKchCgnIcpJiHISopyEKCchykmIchKinIQoJyHKSYhyEqKc3BLVyW1+iKS7ks/XsZ9O8tfSHYNRmIqweqdATik17CSGp3AtaYoCVRY7nNAGrGoVZs0xQwG5BW18cZtSujJZ1lETFKh6CHyKglZvkbQ5dcoySXPgFNVqdf8O/EmbR2e6k9f8AvgWJYH/QbHiU2S8RlEzVN/XSNh9FKf+nrarmpxz7nbUEeqmJ8CXKLB+gVryhPEGXPexGw1/iIQtgHPUTT/TudmZKNujjlFc+hvUZZfl3JLxRqb3YY2xREsro6SwfarhGPm4boxu2NWW4AIZfoCy1035xnvUcSfsbjVLVNsEuVih+m/VuZsK7m5wJ+V8pk3S1tRRFg2/j+q+QvvS3hvXvvi0yTpEwuxYTQ+i1lUT2s/AbOi5uw/lzGt8LDC6v/jMQJ21LKX/nRDlJEQ5CVFOQpSTEOUkRDkJUU5ClJMQ5SREOQlRTkKUkxDlJEQ5CVFOQpSTEOUkRDkJUU5ClJMQ5SREOQlRTkKUk66oG4M8GRi3WCG99ZsoG+S5RX+D39LGYT4EBuu37EFTTl6iENUKJTvm7OSEKiTTJllWqP5L5KOxi6Y5Z0vBrtGYxXOUNvsESbIprrVi014tZXeOPKzpJIO7HbUpF7wAPkdBqzXjneLqxaa9/oSymy+Qhw3djirvGbXaCniJUmhb4DPapF2tvEOifkUjcV8iD1t296jO8nuNJp02aODwKeMcoOylO2j5Ao3GfYU83Ajk3xjTnVKypF0NI7m97B3dnXO+XnbA7XnmlQ1593LjGWrfvOA7B7/X9G8DvPSN6Xb9K4EA/gV6vQiQwajILwAAAABJRU5ErkJggg=="
        />
        <image
          id="image1_3144_235"
          width="69"
          height="80"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABQCAYAAABPlrgBAAAACXBIWXMAAC4jAAAuIwF4pT92AAACIklEQVR4Xu3cMW4TQRiG4fdHkWjWadLb1EBPFS5AlRrlDhyIjgPQUHIKJFJQYW4A2To/xcxGXvNNllDh2e+RVrK0K0vzasdy8WsiM7G5s6UHACJiA+yAYenZ/9wI7IExH3gbYulNqUFeA9eUMKdsD3wEvgLfM3OUT2Vm8wI2wBvgE/ATuDvx6xfwBXgPvKS+FMdXc/tERFDejGvgEjhvPXtCNsALyjZq/hQ8ad2oBmBL+bJeBGU9zd/IpShQvqQn0w64AnZ1R8z8TZQeTTvgn9+UXjV3wJqjNDmK4CiCowiOIjiK4CiCowiOIjiK4CiCowiOIjiK4CiCowiOIjiK4CiCowiOIjiK4CiCowiOIjiK4CiCowiOIsyiqFmNtThc+32UiBiAbR38W5W65m1tUKIcz7dFxDn9TTApQZnlu6ROf0ZEHA4CTqOhr+rnG/qadTs2UIYCd8Bb4CnwGf4cLt5QojyjRPlGn2GCssZ3QFJGvW6mm2pkdBqr3FECXdDnVhqA5+pGa452Gqsc6DPIZFrbbOx86X9Kz0GalqKskqMIjiI4iuAogqMIjiI4iuAogqMIjiI4iuAogqMIjiI4iuAogqMIjiI4iuAogqMIjiI4iuAogqMIjiI4iuAownGUNZ+ZeL/2w/mUEfhBGdjpcXrpIbeUtY9Qo2RmRsQe+FAfOvXjEB9rWvs+M3N2dmRHB2c+1kgJcgviQM21Dhgfnjr6G8DJn1jSL0gcAAAAAElFTkSuQmCC"
        />
        <image
          id="image2_3144_235"
          width="111"
          height="84"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
        <image
          id="image3_3144_235"
          width="69"
          height="43"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAArCAYAAAAuc0UDAAAACXBIWXMAAC4jAAAuIwF4pT92AAACDElEQVRoQ+2ZPXLCMBBG32YykwY4Ak7PAVKRO6RPTpcD5ALpcgbSkyvgXimkxcJZY35s2TF6M8zAIBf7vN/aI4lzjswhd/EPEZGmhVMnrn0vRURmwFJE5uZVEybUvAwOvJRgqQDegLWILG6ha8SzANb42gsRkftozRx4Bp7C942IbIHSTXDwhO4ogBXwCjwAnwCxFPAynoBHYAN8EOQ453ZMgJCAOVV3rIAl8K1r6lIIF6yoLG6AdxH5Anb/tWuCjBlVXW94MX9mqCUFQG2qxVn4/MtI1aLyQnXTVchBLU1SFAEW+FlTUIsUI5fTEJUCf4MbHyRtUhQrUqOWU+uOOCqtT9VTpcBhpEw5YxjGR7rj5Pevc6QoTXIGHcYtg7S1O2IukaKMZhifMEjP4hopymDD+NJB2kYXUpRk86bLqFh0KQUSzJuuo2LRtRSl83nTV1Qs+pKiXD1v+o6KRd9SlIte/lJExSKVFDjh5Q8oo/VJomKRUopyTM42WleQICoWQ0hRLDlxp+gc6TUqFkNKUWI51n/JGYMUZRABFgdHHBlPlmKQpRhkKQZZikGWYpClGGQpBlmKQZZikKUYZCkGWYpBlmJQl3LWDvvE2Nce76eUwA9+syf5btfA7PC1lxCkOOdc2Dh+D4sK+9rJorVvnXNO4pOF6Ehh1nDxVCnxQnYAUj9uCYdPN0d87vQLtdq6w2QabggAAAAASUVORK5CYII="
        />
        <image
          id="image4_3144_235"
          width="60"
          height="60"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAC4jAAAuIwF4pT92AAADoUlEQVRoQ+2b61LbMBBGj3IhoUAphbbT93+6Ti8DoZCEXNwfq43WshyHUizi+pvZ8SWO2ONd2WH82RVFwf+kUdMBKTnnXNMxr63iLyvl9n3PgFnA7LBGhV0echJqgT2sAwZ+add3hyW++tqykBpbu70PPAnsnBsgcANgGIU9AbmANTaJ2ALbOujKHDawI2AMnJgY+dBjoF1ohdgicGtgBTyZWAE455LQJWDfxgo7AabAO+AMOPX7TqhWui3ZFl4jgHPg0YTz+5PQO+Bozo4RwAvg0sd7BH7qPx/S3ny2SWt1Vwjsb2AG3CI56fE2dopbWqt7gsBdAp+AG+Cj3z6lXOU2pQBrYAk8AHfATwJLaT4755ytsgXWCg+R1j0DPiDAX4HPwBVwTpjPOVpa23kJ3AO/kHwx+5dIW6/jAVIVHiJAp0gbXwNfEOhrpM0nhJbOAbwBFkgrT/1nWvF7v9QO1FsWUAXWCo+Rgc4Q6CukrW/ID6wtvSBUdoG09jlSqNQ1BvDA5oKlFy2tsl6lz31c8DaAN0h+IJW9INxJdLol80v9lrbQ9l48iSI3MMg8nRJyGpOAtReuVEvr0oLbGJn1NmFVOh9tLiOzrj+KkrnVVTgVdiAbOVSXlwVN5nfofTT+Yi5QVV1RiNYragLODfbP1QR8bGosUNeAG9UDd109cNfVA3ddPXDX1QN3XT1w19UDd109cNfVA3ddPXDX1QMfuWrdO6om4MYBjk1NwKoYPPeJiD0c1stR8XVY1VkP4wHsvvgPtK04hy3hKb992p/MMQauGyxlAIP2nyBqXprD2ix13Z6AilIVtoOq8UvNX0vCk/ccz4dtbgsTamRZEcB3Fa64eIqiKLyPVKuqsEs/4IMPNZA8kRdYPR4zH2pkmRPcOyVola2wbeMVAvvoB7tF/BMgf0h9WjmAYxfPD8S6dIeY1OZI/gpcUmoOq8tNYa0Pao6YR9QlA+1CK3Ds0/qGmNNmSN5PhPm8t8J69rS6d5TdMrcE66G1F7Ql29KxE+87kp8FPqjCatp8RAbAb88QC9OE4KhVvTa4TXyf1zKucMU7vQP2F664pUFOgFZbYXNYlqB8nalz0y6Q/JO3ppJB3BjU1I1nPVq6bWFzAEOzX3pDjUm84oiPbMSxL2tAmLttw6oKE6kfRHsd8XWvAMR2oEG0jVm2rcIsbYvvtp/9zsPuw+pbLbkg62ThX/ZWS53ewjtLcBhcSs8GPnYd+v9wZ/QHTbqvfA0XAmsAAAAASUVORK5CYII="
        />
        <image
          id="image5_3144_235"
          width="46"
          height="46"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAwUlEQVRoQ+3ZsQkCMRyF8S8iZAm765zAzr0cwJ3sLG8BN8gQSfW3CIdeZ/VM4P0gTSDwcXDVSxFBSikDJyAzpgaUiGjbRaLHXoAbPX5EBbgD63f8AjyACsSgpwJP4ArkiADgDLx+ePzvU+kfeIkIDsxj9x/OFL7jcDWHqzlczeFqDldzuJrD1Ryu5nA1h6s5XM3hag5Xc7iaw9UcruZwNYcLNPre2aCH7y4G1YCVPtIWgCOf1RYmWpbTtFv+Ni/P5g1xTodLg4W2uAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
}
