import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useCallAPI from "../../hooks/useCallAPI";
import {useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import CONSTANTS_STRING from "../../constants/strings";
import useNotification from "../../hooks/useNotification";
import NotificationCard from "../Notification/NotificationCard";
const navigation = [{ name: "Dashboard", href: "#", current: true }];

export default function Header() {
  const { logout } = useCallAPI();

  const { allNotifications, notificationCount } =
    useContext(TaskContext);
  const {clearNotification,clearAllNotifications} = useNotification();


  return (
    <Disclosure as="nav" className="bg-gray-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="MindFire"
                src="https://www.mindfiresolutions.com/home-assets/images/logo.webp"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={"page"}
                    className={
                      "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
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
              </div>

              <MenuItems
                onClick={(e) => e.stopPropagation()}
                transition
                className="absolute right-0 z-10 mt-2 w-72 max-h-64 overflow-y-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {/* Fixed "Clear All" Button */}
                {notificationCount > 0 && (
                  <div className="sticky top-0 bg-red-500 z-50 text-center p-1">
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
                    <NotificationCard notification={notification} clearNotification={clearNotification}/>
                  </MenuItem>
                ))}

                {/* Message when there are no notifications */}
                {notificationCount === 0 && (
                  <div className="block px-4 py-2 text-sm text-gray-700 font-bold m-1 rounded">
                    {CONSTANTS_STRING.NO_NOTIFICATIONS}
                  </div>
                )}
              </MenuItems>
            </Menu>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <img
                    alt=""
                    src="./profile.png"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    data-testid="logout_btn"
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                  {CONSTANTS_STRING.SIGN_OUT}
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={"page"}
              className={
                "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              }
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
