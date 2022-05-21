# Truster Lender

In this problem that flash loan calls an arbitray function "target.functionCall(data)", in which you can exploit the approve function here to allow yourself to spend unlimited amount of tokens for the attacker. The tricky part here was actually encoding the data of functionCall(data) in the correct byte format.
