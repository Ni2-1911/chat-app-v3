import { Contact } from "../../../types/type.common";

export default function ChatHeader({ contactInfo }: { contactInfo: Contact }) {
  return (
    <div className="chatHeader flex-corner">
      <div className="flex-center">
        <img
          src={contactInfo.profileImg}
          alt="..."
          className="p-3 profile-img"
        />
        <h3 className="ellipsis-1-line text-wt-300">{contactInfo.name}</h3>
      </div>
      <div className="flex-center">
        <i className="bx bx-search bx-sm p-2"></i>
        <i className="bx bx-dots-vertical-rounded bx-sm p-2"></i>
      </div>
    </div>
  );
}
