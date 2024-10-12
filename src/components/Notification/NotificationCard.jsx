import { useContext } from "react";
import { MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import NotificationItem from "./NotificationItem";
import useNotification from "../../hooks/useNotification";
import { TaskContext } from "../../context/TaskContext";
import CONSTANTS_STRING from "../../constants/strings";

export default function NotificationCard() {
  const { clearNotification, clearAllNotifications } = useNotification();
  const { allNotifications, notificationCount } = useContext(TaskContext);

  return (
    <>
      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">{CONSTANTS_STRING.VIEW_NOTIFICATIONS}</span>
          <BellIcon
            aria-hidden="true"
            data-testid="bell_icon"
            className="h-6 w-6"
          />

          {/* Notification Badge */}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex h-3 w-max p-1 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {notificationCount}
            </span>
          )}
        </span>
      </MenuButton>

      <MenuItems
        onClick={(e) => e.stopPropagation()}
        transition
        className="absolute right-0 z-10 mt-2 w-72 max-h-64 overflow-y-auto origin-top-right rounded-md bg-zinc-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {/* Fixed "Clear All" Button */}
        {notificationCount > 0 && (
          <div className="sticky top-0 bg-zinc-700 z-50 text-center p-2 ">
            <span
              data-testid="clear_all_notifications"
              onClick={(e) => {
                e.stopPropagation();
                clearAllNotifications();
              }}
              className="w-full text-white py-2 text-center font-bold rounded"
            >
              {CONSTANTS_STRING.CLEAR_ALL_NOTIFICATIONS}
            </span>
          </div>
        )}

        {/* Notification Items */}
        {allNotifications.map((notification) => (
          <MenuItem key={notification._id} className="relative">
            <NotificationItem
              notification={notification}
              clearNotification={clearNotification}
            />
          </MenuItem>
        ))}

        {/* Message when there are no notifications */}
        {notificationCount === 0 && (
          <div className="block px-4 py-2 text-sm text-zinc-50 font-bold m-1 rounded">
            {CONSTANTS_STRING.NO_NOTIFICATIONS}
          </div>
        )}
      </MenuItems>
    </>
  );
}
