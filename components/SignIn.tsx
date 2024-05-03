import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";

export default function SignIn() {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center ">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-20 rounded-full bg-white  p-2 dark:bg-kanbanDarkGrey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              // width="96px"
              // height="96px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </button>
          <span className="text-xs font-bold text-kanbanLightGrey">google</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <button
            onClick={signInWithGithub}
            type="button"
            className="w-20 rounded-full bg-white  p-2 dark:bg-kanbanDarkGrey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              // width="64px"
              // height="64px"
            >
              <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z" />
            </svg>
          </button>
          <span className="text-xs font-bold text-kanbanLightGrey">github</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <button
            type="button"
            className="w-20 rounded-full bg-white p-2 dark:bg-kanbanDarkGrey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              // width="96px"
              // height="96px"
            >
              {" "}
              <path d="M 16 1 C 14.865 1 13.768969 1.4795781 13.042969 2.2675781 C 12.386969 2.9845781 11.988281 4.25725 11.988281 5.28125 C 13.160281 5.28125 14.412422 4.6809062 15.107422 3.8789062 C 15.755422 3.1279062 16 2.209 16 1 z M 8.2753906 5.5136719 C 6.1813906 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.7665781 21 8.8925781 21 L 8.921875 21 C 10.190875 21 10.634047 20.176969 12.373047 20.167969 C 14.112047 20.176969 14.556219 21 15.824219 21 L 15.853516 21 C 17.395516 21 19.795 18.536172 21 15.576172 C 19.693 14.924172 18.785156 13.576 18.785156 12 C 18.785156 10.461 19.652156 9.1397031 20.910156 8.4707031 C 19.823156 6.4267031 17.895703 5.5136719 16.470703 5.5136719 C 14.931703 5.5136719 13.645047 6.5546875 12.373047 6.5546875 C 11.101047 6.5546875 9.8143906 5.5136719 8.2753906 5.5136719 z M 8.2753906 7.5136719 C 8.7073906 7.5136719 9.2378281 7.7175469 9.7988281 7.9355469 C 10.546828 8.2255469 11.393047 8.5546875 12.373047 8.5546875 C 13.353047 8.5546875 14.201219 8.2255469 14.949219 7.9355469 C 15.509219 7.7185469 16.038703 7.5136719 16.470703 7.5136719 C 16.888703 7.5136719 17.539438 7.7102656 18.148438 8.1972656 C 17.281437 9.2512656 16.787109 10.587 16.787109 12 C 16.787109 13.597 17.407516 15.080687 18.478516 16.179688 C 17.487516 17.864687 16.261547 18.886 15.810547 19 C 15.658547 18.998 15.548828 18.957875 15.173828 18.796875 C 14.596828 18.548875 13.723328 18.174969 12.361328 18.167969 C 11.020328 18.174969 10.149266 18.548875 9.5722656 18.796875 C 9.2142656 18.950875 9.0976406 18.993047 8.9316406 18.998047 C 7.9416406 18.757047 5 15.437328 5 12.111328 C 5 8.6383281 7.2073906 7.5146719 8.2753906 7.5136719 z" />
            </svg>
          </button>
          <span className="text-xs font-bold text-kanbanLightGrey">apple</span>
        </div>
      </div>
    </div>
  );
}