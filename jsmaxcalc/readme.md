This was the quick and dirty testbed for the very first real workaround I ever used in real code.

We were converting legacy Java Applets to Javascript using GWT, however, whenever Java's INTEGER.MAX_VALUE was used, GWT would inject the constant 2147483647, even though what we really wanted was, based on the current environment (javascript) the highest integer with precision.

Most of the time this didn't matter, but for some of the applets where large numbers could be generated very easily by user provided data, we wanted to use JS's maximum value. The workaround was to simply perform a binary search for the maximum value with precision in the actual environment.

The resulting Java code (not included) is very similar, and looks very funky to see in a Java codebase, but got the job done very neatly.

I'm not quite sure what the alerted values are all about anymore.

Not the most groundbreaking or crazy hack, but certainly one that I've never forgotten.
