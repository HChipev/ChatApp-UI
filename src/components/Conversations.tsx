import { useSelector } from "react-redux";
import { useGetUserConversationsQuery } from "../store/slices/api/conversationApiSlice";
import { selectCurrentId } from "../store/slices/identitySlice";
import ConversationCard from "./ConversationCard";
import {
  Conversation,
  Conversations,
  GroupedConversations,
} from "../interfaces/conversation";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { addRefetchConversationsListener } from "../services/signalR";

dayjs.extend(utc);
dayjs.extend(timezone);

const Conversations = () => {
  const userId = useSelector(selectCurrentId);
  const { data, isLoading, refetch } = useGetUserConversationsQuery(
    String(userId)
  );
  const [groupedConversations, setGroupedConversations] =
    useState<GroupedConversations>();

  useEffect(() => {
    addRefetchConversationsListener(() => {
      refetch();
    });
  }, []);

  useEffect(() => {
    if (data) {
      setGroupedConversations(groupConversationsByTime(data));
    }
  }, [data]);

  const getUserTimeZone = () => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return userTimeZone;
    } catch (error) {
      return "UTC";
    }
  };

  const groupConversationsByTime = (data: Conversations) => {
    const groupedConversations: GroupedConversations = {};

    const currentDate = dayjs();

    const isToday = (date: dayjs.Dayjs) => date.isSame(currentDate, "day");
    const isYesterday = (date: dayjs.Dayjs) =>
      date.isSame(currentDate.subtract(1, "day"), "day");
    const isPrevious7Days = (date: dayjs.Dayjs) =>
      date.isAfter(currentDate.subtract(7, "day")) &&
      date.isBefore(currentDate);
    const isLastMonth = (date: dayjs.Dayjs) =>
      date.isAfter(currentDate.subtract(30, "day")) &&
      date.isBefore(currentDate);
    const isOlderThanOneMonth = (date: dayjs.Dayjs) =>
      date.isBefore(currentDate.subtract(1, "month"));

    data.conversations.forEach((conversation) => {
      const conversationDate = dayjs
        .utc(conversation.modifiedAtUtc)
        .tz(getUserTimeZone());

      if (isToday(conversationDate)) {
        if (!groupedConversations["Today"]) {
          groupedConversations["Today"] = [];
        }

        groupedConversations["Today"].push(conversation);
      } else if (isYesterday(conversationDate)) {
        if (!groupedConversations["Yesterday"]) {
          groupedConversations["Yesterday"] = [];
        }

        groupedConversations["Yesterday"].push(conversation);
      } else if (isPrevious7Days(conversationDate)) {
        if (!groupedConversations["Previous 7 Days"]) {
          groupedConversations["Previous 7 Days"] = [];
        }

        groupedConversations["Previous 7 Days"].push(conversation);
      } else if (isLastMonth(conversationDate)) {
        if (!groupedConversations["Last Month"]) {
          groupedConversations["Last Month"] = [];
        }

        groupedConversations["Last Month"].push(conversation);
      } else if (isOlderThanOneMonth(conversationDate)) {
        const monthYearKey = `${conversationDate.format("MMMM YYYY")}`;

        if (!groupedConversations[monthYearKey]) {
          groupedConversations[monthYearKey] = [];
        }

        groupedConversations[monthYearKey].push(conversation);
      }
    });

    return groupedConversations;
  };

  return (
    <div className="flex flex-col flex-grow overflow-y-auto scrollable-y">
      {isLoading ? (
        <div className="flex min-w-full min-h-full justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {groupedConversations &&
            Object.keys(groupedConversations).map((timeInterval) => (
              <div key={timeInterval}>
                <h2 className="text-lg font-semibold p-2 sticky top-0 bg-gray-100 dark:bg-gray-900">
                  {timeInterval}
                </h2>
                {groupedConversations[timeInterval].map(
                  (conversation: Conversation) => (
                    <ConversationCard
                      key={conversation.conversationId}
                      title={conversation.title}
                      conversationId={conversation.conversationId}
                    />
                  )
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Conversations;
