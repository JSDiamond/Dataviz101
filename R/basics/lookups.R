# lookup tables

# make a dataframe from a column bind and rename the one column
events = cbind( sample(c("a", "b", "c", "d", "e"), 100, replace = TRUE))
events = data.frame(events)
names(events)[names(events)=="events"] <- "boro"


# easier way to make a dataframe with named columns
borough_codes = data.frame(
  ID = c("a", "b", "c", "d", "e"),
  BORO = c("Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island")
)


# match(A ,B) returns the index of each value in A as it appears in B.
# aka: look up val A[1] and return it's index in B, A[2] in B, ... etc
matches = match(events$boro, borough_codes$ID)

# make a new column in events that is the value of matches in borough_codes$BORO
events$boro_name = borough_codes$BORO[matches]

#all on one line
events$boro_name = borough_codes$BORO[ match(events$boro, borough_codes$ID) ]

# lookup in a loop -- keeping tables separate
for(i in 1:nrow(events)) {
  row = events[i,]
  match = match(row$boro, borough_codes$ID)
  print(match)
  boro =  borough_codes$BORO[match]
  print(boro)
}