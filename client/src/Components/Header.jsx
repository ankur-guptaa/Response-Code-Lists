const Header = (props) => {
  return (
    <div className=" w-full flex flex-col gap-1">
      <div className="w-full flex justify-center text-3xl font-semibold">
        Response Code Lists - MoEngage Assignment
      </div>
      <div className="w-full flex justify-center text-lg">{props.heading}</div>
    </div>
  );
};

export default Header;
