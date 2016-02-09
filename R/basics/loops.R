# basic for loop
for(i in 1:5) {
  print(i)
}

# make a dataframe from random samples
cols = cbind( sample(0:9, 10, replace = TRUE) , sample(0:9, 10, replace = TRUE))
df = data.frame(cols)

# loop through a dataframe by column (by default)
for(col in df) {
  print(col)
}

# loop through a dataframe by row
for(i in 1:nrow(df)) {
  row = df[i,]
  print(row$X1)
  # make a new column with the value of X1 * X2 for each row 
  df$Z1[i] = row$X1 * row$X2
  # make a new column with the value of X1 * X2 for each row 
  df$coor[i] = paste("[",as.character(row$X1),", ",as.character(row$X2),"]", sep = "")
}

# sort the dataframe by column name
df.sorted = df[with(df, order(Z1, na.last = TRUE, decreasing = TRUE)), ]


# write a function to do something to your data
munge = function(c, extra) {
  # it will return whatever is on the last line
  as.numeric(c['X1']) * as.numeric(c['X2'])*10000
}

# apply: 1 indicates rows, 2 indicates columns, c(1, 2) indicates rows and columns
df$ZZ = apply(df, 1, munge, extra = 'any argument')

#select a subset of rows based on a boolean value
subdf = subset(df, df$X1 > 4)
subdfX1 = subset(df, df$X1 > 4)$X1