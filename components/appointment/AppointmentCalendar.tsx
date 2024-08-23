import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { ThemedView } from "@/components/ThemedView";
import moment from "moment";

interface AppointmentCalendarProps {
  selectedDate: string;
  onDateSelect: (date: DateData) => void;
  markedDates: { [key: string]: any };
  theme: {
    backgroundColor: string;
    textColor: string;
    tintColor: string;
  };
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ selectedDate, onDateSelect, markedDates, theme }) => {
  const handleDateSelect = (date: DateData) => {
    const selectedMoment = moment(date.dateString);
    const today = moment().startOf("day");

    if (selectedMoment.isSameOrAfter(today)) {
      onDateSelect(date);
    }
  };

  return (
    <ThemedView style={styles.calendarContainer}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={markedDates}
        minDate={moment().format("YYYY-MM-DD")}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          textSectionTitleColor: theme.textColor,
          selectedDayBackgroundColor: theme.tintColor,
          selectedDayTextColor: theme.backgroundColor,
          todayTextColor: theme.tintColor,
          dayTextColor: theme.textColor,
          textDisabledColor: `${theme.textColor}50`,
          arrowColor: theme.tintColor,
          monthTextColor: theme.textColor,
          indicatorColor: theme.tintColor,
          textDayFontFamily: "System",
          textMonthFontFamily: "System",
          textDayHeaderFontFamily: "System",
          textDayFontWeight: "300",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 13,
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default AppointmentCalendar;
