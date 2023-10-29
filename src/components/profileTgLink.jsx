import default_icon from "./../images/User_icon.png";
const tg = window.Telegram.WebApp;
function ProfileTgLink() {
  let first_name = "Владимир";
  let last_name = "Путин";
  let url =
    "https://i.ytimg.com/vi/l5AXpKPABUk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgWShOMA8=&rs=AOn4CLAdqZJrD4dW8p6PxeakjqaV_VM3Sg";
  if (tg.initDataUnsafe.user != undefined) {
    first_name = tg.initDataUnsafe.user.first_name;
    last_name = tg.initDataUnsafe.user.last_name;
    url = tg.initDataUnsafe.user.photo_url;
  }
  return (
    <div id="profile_avatar_tgLink">
      <div id="inner_avatar_profile">
        <div id="profile_avatar">
          <img src={default_icon} />
          <p>
            {first_name} {last_name}
          </p>
        </div>
        <div id="tgLink">
          <a href="https://t.me/applepods_black">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_63_796)">
                <path
                  d="M16.7469 32.0133C25.5871 32.0133 32.7536 24.8469 32.7536 16.0067C32.7536 7.16643 25.5871 0 16.7469 0C7.90666 0 0.740234 7.16643 0.740234 16.0067C0.740234 24.8469 7.90666 32.0133 16.7469 32.0133Z"
                  fill="url(#paint0_linear_63_796)"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.97716 15.8334C12.6419 13.8076 15.7473 12.4615 17.3066 11.8084C21.7448 9.95588 22.6777 9.63601 23.2775 9.62268C23.4107 9.62268 23.7039 9.64934 23.9039 9.80927C24.0638 9.94255 24.1038 10.1158 24.1304 10.2491C24.1571 10.3824 24.1837 10.6622 24.1571 10.8755C23.9172 13.4078 22.8776 19.5519 22.3445 22.3774C22.1179 23.5769 21.6781 23.9767 21.2516 24.0167C20.3187 24.0967 19.6123 23.4036 18.7194 22.8172C17.3066 21.8976 16.5203 21.3245 15.1475 20.4182C13.5615 19.3786 14.5877 18.8055 15.494 17.8726C15.7339 17.6327 19.8256 13.9009 19.9055 13.5677C19.9189 13.5277 19.9189 13.3678 19.8256 13.2878C19.7323 13.2079 19.599 13.2345 19.4924 13.2612C19.3458 13.2878 17.1067 14.7805 12.7485 17.726C12.1088 18.1658 11.5357 18.379 11.0159 18.3657C10.4428 18.3524 9.34993 18.0458 8.5236 17.7793C7.52402 17.4594 6.72435 17.2862 6.79099 16.7264C6.83098 16.4332 7.23081 16.14 7.97716 15.8334Z"
                  fill="white"
                ></path>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_63_796"
                  x1="16.7336"
                  y1="0"
                  x2="16.7336"
                  y2="31.7601"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2AABEE"></stop>
                  <stop offset="1" stop-color="#229ED9"></stop>
                </linearGradient>
                <clipPath id="clip0_63_796">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0.740234)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <div id="text_tgLink">
            <a href="https://t.me/applepods_black"></a>
            <p>
              <a href="https://t.me/applepods_black">@Applepods_Black</a>
            </p>
            <p>наш Telegram-канал</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileTgLink;
