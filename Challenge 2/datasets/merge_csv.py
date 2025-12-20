#!/usr/bin/env python3
"""
Script to merge two CSV files based on a common key (cve_id).
"""

import pandas as pd
import os

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Define file paths
FILE1 = os.path.join(SCRIPT_DIR, "cve_data.csv")
FILE2 = os.path.join(SCRIPT_DIR, "cve_cisa_epss_enriched_dataset.csv")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "merged_cve_data.csv")

def read_csv_files():
    """Read both CSV files and return as DataFrames."""
    print(f"Reading {os.path.basename(FILE1)}...")
    df1 = pd.read_csv(FILE1)
    print(f"  - Rows: {len(df1)}, Columns: {len(df1.columns)}")
    
    print(f"Reading {os.path.basename(FILE2)}...")
    df2 = pd.read_csv(FILE2)
    print(f"  - Rows: {len(df2)}, Columns: {len(df2.columns)}")
    
    return df1, df2

def merge_dataframes(df1, df2, merge_type="outer"):
    """
    Merge two DataFrames on 'cve_id' column.
    
    Args:
        df1: First DataFrame
        df2: Second DataFrame
        merge_type: Type of merge ('inner', 'outer', 'left', 'right')
            - 'inner': Only rows with matching cve_id in both files
            - 'outer': All rows from both files (union)
            - 'left': All rows from df1, matching rows from df2
            - 'right': All rows from df2, matching rows from df1
    
    Returns:
        Merged DataFrame
    """
    print(f"\nMerging datasets using '{merge_type}' join on 'cve_id'...")
    
    # Identify common columns (excluding the merge key)
    common_cols = set(df1.columns) & set(df2.columns) - {"cve_id"}
    print(f"  - Common columns (will use suffixes): {common_cols}")
    
    # Merge the DataFrames
    merged_df = pd.merge(
        df1, 
        df2, 
        on="cve_id", 
        how=merge_type,
        suffixes=("_file1", "_file2")
    )
    
    print(f"  - Merged dataset: {len(merged_df)} rows, {len(merged_df.columns)} columns")
    
    return merged_df

def save_merged_file(df, output_path):
    """Save the merged DataFrame to a CSV file."""
    print(f"\nSaving merged data to {os.path.basename(output_path)}...")
    df.to_csv(output_path, index=False)
    print(f"  - File saved successfully!")

def main():
    """Main function to orchestrate the CSV merge process."""
    print("=" * 60)
    print("CSV Merger Script")
    print("=" * 60)
    
    # Read CSV files
    df1, df2 = read_csv_files()
    
    # Show column information
    print("\nColumns in cve_data.csv:")
    print(f"  {list(df1.columns)}")
    print("\nColumns in cve_cisa_epss_enriched_dataset.csv:")
    print(f"  {list(df2.columns)}")
    
    # Merge DataFrames
    # You can change merge_type to: 'inner', 'outer', 'left', 'right'
    merged_df = merge_dataframes(df1, df2, merge_type="outer")
    
    # Save the result
    save_merged_file(merged_df, OUTPUT_FILE)
    
    print("\n" + "=" * 60)
    print("Merge completed successfully!")
    print(f"Output file: {OUTPUT_FILE}")
    print("=" * 60)

if __name__ == "__main__":
    main()
