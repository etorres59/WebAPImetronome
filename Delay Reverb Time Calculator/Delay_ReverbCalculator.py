import time
import math

# Function to calculate time in milliseconds for different note subdivisions
def calculate_times(bpm):
    # Calculate the duration of a quarter note in milliseconds
    quarter_note_ms = 60000.0 / bpm

    # Note subdivisions categorized by note type with their durations
    notes = [
        ("Whole Note", quarter_note_ms * 4), ("Dotted Whole Note", quarter_note_ms * 6), ("Triplet Whole Note", quarter_note_ms * 8 / 3),
        ("Half Note", quarter_note_ms * 2), ("Dotted Half Note", quarter_note_ms * 3), ("Triplet Half Note", quarter_note_ms * 4 / 3),
        ("Quarter Note", quarter_note_ms), ("Dotted Quarter Note", quarter_note_ms * 1.5), ("Triplet Quarter Note", quarter_note_ms * 2 / 3),
        ("Eighth Note", quarter_note_ms / 2), ("Dotted Eighth Note", quarter_note_ms * 0.75), ("Triplet Eighth Note", quarter_note_ms / 3),
        ("Sixteenth Note", quarter_note_ms / 4), ("Dotted Sixteenth Note", quarter_note_ms / 4 * 1.5), ("Triplet Sixteenth Note", quarter_note_ms / 6),
        ("Thirty-second Note", quarter_note_ms / 8), ("Dotted Thirty-second Note", quarter_note_ms / 8 * 1.5), ("Triplet Thirty-second Note", quarter_note_ms / 12),
        ("Sixty-fourth Note", quarter_note_ms / 16), ("Dotted Sixty-fourth Note", quarter_note_ms / 16 * 1.5), ("Triplet Sixty-fourth Note", quarter_note_ms / 24)
    ]

    # Consolidate output for efficient console I/O
    output = f"\nReverb and Delay Times at {bpm} BPM:\n\n"
    categories = ["Whole Notes", "Half Notes", "Quarter Notes", "Eighth Notes", "Sixteenth Notes", "Thirty-second Notes", "Sixty-fourth Notes"]
    idx = 0

    # Iterate over categories and corresponding notes to print their times
    for category in categories:
        output += f"--- {category} ---\n"
        for _ in range(3):
            if idx < len(notes):
                output += f"{notes[idx][0]}: {notes[idx][1]:.2f} ms\n"
                idx += 1
        output += "\n"

    print(output)

# Function to get the tempo by tapping the "Enter" key
def tap_tempo():
    intervals = []
    last_tap = None
    tap_count = 0
    required_taps = 8

    print("Press Enter to tap the tempo. Press Enter 8 times to calculate BPM...")

    # Loop until the required number of taps is reached
    while tap_count < required_taps:
        input()  # Wait for user input (Enter key)
        now = time.time()  # Get the current time in seconds

        # Calculate the interval between taps
        if last_tap is not None:
            interval = (now - last_tap) * 1000  # Convert seconds to milliseconds
            intervals.append(interval)
            print(f"Interval: {interval:.2f} ms")

        last_tap = now
        tap_count += 1

    # Ensure there are enough intervals to calculate BPM
    if len(intervals) >= 7:
        average_interval = sum(intervals) / len(intervals)
        bpm = 60000.0 / average_interval  # Convert interval to BPM

        bpm = round(bpm)  # Round BPM to the nearest whole number
        print(f"Calculated BPM: {bpm}")
        return bpm
    else:
        print("Not enough intervals to calculate BPM.")
        return 0.0

# Main function to run the program
def run_program():
    while True:
        print("Reverb and Delay Time Calculator")
        print("1. Input BPM manually")
        print("2. Tap Tempo")
        print("3. Restart Program")
        print("4. Exit")

        # Get user input for the choice
        choice = input("Select an option: ")

        if choice == "1":
            # Manually input BPM and calculate note times
            bpm = float(input("Enter BPM: "))
            calculate_times(bpm)
        elif choice == "2":
            # Use tap tempo to calculate BPM and then note times
            while True:
                bpm = tap_tempo()
                if bpm != 0:
                    calculate_times(bpm)
                    break
        elif choice == "3":
            # Restart the program (just continue the loop)
            continue
        elif choice == "4":
            # Exit the program
            print("Exiting program...")
            break
        else:
            # Handle invalid input
            print("Invalid option selected. Please try again.")

# Entry point of the program
if __name__ == "__main__":
    run_program()
