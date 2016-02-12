# A vector of some strings that look like the timstamp in the 311 data.
datestring = c("02/10/2016 11:59:00 PM", "02/10/2016 8:58:00 PM", "02/10/2016 11:57:00 AM", "02/09/2016 11:48:00 PM", "02/09/2016 6:58:00 PM")

# Convert all datestrings to native R date objects.
# The format needs to abide by old standards
# see d3 ref here: https://github.com/mbostock/d3/wiki/Time-Formatting
dateobj = as.POSIXct(datestring, format = "%m/%d/%Y %I:%M:%S %p", tz = "EST")

# Make a dataframe from the dateobj and some values.
complaints = data.frame(
  date = dateobj,
  value = c(30, 20, 25, 15, 35)
)

# You don't need to sort by dates, ggplot with do that, 
# but here's how you could.
complaints = complaints[order(complaints$date),]


library(ggplot2)

ggplot(complaints, aes(x=date, y=value)) +
  geom_line() +
  geom_point() +
  theme(axis.text.x=element_text(angle=-90,hjust=1,vjust=0.5))

