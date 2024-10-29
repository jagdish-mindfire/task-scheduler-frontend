import { Avatar,AvatarFallback,AvatarImage } from "./components/Common/Avatar";

export const apis = {
    me : {
        name : "Jagdish Pal"
    }
  }

  export const getFirstLetters = (string) => {
    return string.split(" ").map(i=>i[0]).join(',').replace(',','').toUpperCase();
  };

  export const StringDP = () => {
    return (
      <>
      <Avatar className="h-6 w-6 mr-2">
      <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
      <AvatarFallback>{getFirstLetters(apis.me.name)}</AvatarFallback>
          </Avatar>
      </>
    )
  };
