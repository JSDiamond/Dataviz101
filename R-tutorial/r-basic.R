################################################################################
# Introduction to R
# VIA: Odum Institute for Research in Social Science
#      University of North Carolina at Chapel Hill
################################################################################

# Helpful hint: Use cmd + return to run the line of code you are on

# Values, aka variables
x <- 1
x
x = 2
x



# The c() command
vector = c(1, 2, 3, 4, 5)
vector

# RStudio wants to help
help('c')

# Sequences
# This makes a sequence from 0 to 10, increasing by 1 each time.
sequence = 0:10
# This makes a sequence from 1 to 10, increasing by 2 each time
sequence2 = seq(0, 10, by = 2) 
sequence
sequence2
# This uses c() to repeat the pattern "1, 2, 3" 8 times.
repetition = rep(c(1, 2, 3), times = 8)
repetition

# Helpful hint: Use cmd + return to run the snippet of code you are currently highlighting
# Helpful hint: you can clear your console by pressing ctrl + l

# Referencing vector elements
# This displays the 4th element in sequence.
# Using '.' in the variable name works in R but not most languages
element.4 = sequence[4]
element.4
# This uses c() to reference multiple elements. 
element.4.and.6 = sequence[c(4, 6)]
element.4.and.6
# This makes a sequence with all of the elements of sequence
# except the 3rd element.
no.3rd.element = sequence[-3]
no.3rd.element
# Drawing samples
sample(sequence, 20, replace = TRUE) # Replace means values can repeat
sample(sequence, 10, replace = FALSE) # No repeating values

# Matrices
# This makes a 3 x 3 matrix with the numbers 1 through 9, entering by columns. Notice the use of the colon :
matrix = matrix(1:9, nrow = 3, ncol = 3, byrow = TRUE)
matrix
# Still use square brackets to reference elements. This references the element in row 2, column 2.
row2.col2 = matrix[2, 2]
row2.col2
# This references the entire third row.
row.3 = matrix[3, ]
row.3

# Some basic functions
# Calculate the minimum, maximum, mean, median, and 25th and 75th percentiles of sequence.
min(sequence)
max(sequence)
mean(sequence)
median(sequence)
# Quantiles are cutpoints dividing a set of observations into equal sized groups. 
# There are one fewer quantiles than the number of groups created. 
# Thus quartiles are the 3 cut points that will divide a dataset into four equal-size groups.
quantile(sequence, .25)
quantile(sequence, .75)
# Or we could just use the summary() function
summary(sequence)
# Two more: variance and standard deviation
var(sequence)
sd(sequence)

# Generating random values
random = runif(1)
random
# Get a vector of 4 numbers
random = runif(4)
random
# Get a vector of 3 numbers from 0 to 100
random = runif(3, min=0, max=100)
random
# Get 10 integers from 0 to 100
# Use max=101 because it will never actually equal 101
random = floor(runif(10, min=0, max=101))
sort(random)
hist(random)
# To generate integers WITHOUT replacement, aka repetition
random = sample(1:100, 100, replace=FALSE)
sort(random)
hist(random)
# To generate any number of integers with replacement
random = sample(1:100, 10, replace=TRUE)
sort(random)
hist(random)

random = sample(1:6, 25, replace=TRUE)
# table() takes is a vector of factors, and calculates the frequency that each factor occurs.
table(random)
barplot(table(random), main="Random Values", xlab="value", ylab="frequency")
hist(random)
plot(table(random))

random = runif(20, min=0, max=100)
matrix = matrix(random, nrow = 10, ncol = , byrow = TRUE)
matrix
plot(matrix)


# Creating functions
# This function requires one argument, a vector, called "the.vector" here.
average = function(the.vector){ # Start the function
  S = sum(the.vector) # Step one: Take the sum of all elements in the.vector.
  L = length(the.vector) # Step two: Find no. of elements in the.vector.
  A = S/L # Divide to get the average.
  return(A) # Only return the final result.
} # Close the function.
# Check to make sure it works.
mean(sequence)
average(sequence)



# Probability distributions
# Use the cdf to calculate the probability a random draw will be less than a given number.
pnorm(1.645)
dnorm(1.5) # Use the pdf to calculate density.
qnorm(.95) # Use the quantile function to calculate quantiles from p-values.
rnorm(10) # Random draws
#Binomial example
trials = 50 # 50 trials
x = seq(0, trials, by = 1) 
y = dbinom(x, trials, .2) # n = 50, p = .2.
plot(x, y)
y = dbinom(x, trials, .6) # n = 50, p = .6.
plot(x, y)
z = rbinom(100, trials, .2) # Draw 100 values from a binomial with n = 50, p = .2.
plot(density(z)) # Plot the density of those draws.

# set.seed() allows for random numbers to be the same each time you run a script 
set.seed(123456)
rnorm(10)
