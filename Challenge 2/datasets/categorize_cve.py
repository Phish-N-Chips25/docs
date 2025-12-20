#!/usr/bin/env python3
"""
Script to add a software category column to CVE data.
Categories: kernel, framework, library, application, operating_system, 
            database, web_server, browser, network, firmware, driver, other
"""

import pandas as pd
import os
import re

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Define file paths - can process either merged or original files
INPUT_FILE = os.path.join(SCRIPT_DIR, "merged_cve_data.csv")
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "categorized_cve_data.csv")

# Define category patterns based on product names and keywords
CATEGORY_PATTERNS = {
    # === Operating Systems & Kernel ===
    "kernel": [
        r"\bkernel\b", r"\blinux\b", r"\bfreebsd\b", r"\bopenbsd\b", r"\bnetbsd\b",
        r"\bdarwin\b", r"\bxnu\b", r"\bselinux\b", r"\bkvm\b"
    ],
    "operating_system": [
        r"\bwindows\b", r"\bmacos\b", r"\bmac_os\b", r"\birix\b", r"\bsolaris\b",
        r"\bsunos\b", r"\baix\b", r"\bhp-ux\b", r"\bhpux\b", r"\bbsd_os\b",
        r"\bubuntu\b", r"\bdebian\b", r"\bredhat\b", r"\bcentos\b", r"\bfedora\b",
        r"\bsuse\b", r"\bopensuse\b", r"\bandroid\b", r"\bios\b", r"\bchromeos\b",
        r"\bunix\b", r"\bvxworks\b", r"\bqnx\b", r"\brtos\b"
    ],
    
    # === Web & Application Servers ===
    "web_server": [
        r"\bapache\b", r"\bnginx\b", r"\biis\b", r"\btomcat\b", r"\blighttpd\b",
        r"\bcaddy\b", r"\bhttpd\b", r"\bweblogic\b", r"\bwebsphere\b", r"\bjboss\b",
        r"\bwildfly\b", r"\bjetty\b", r"\bgunicorn\b", r"\buwsgi\b"
    ],
    
    # === Databases ===
    "database": [
        r"\bmysql\b", r"\bpostgresql\b", r"\bpostgres\b", r"\boracle\b", r"\bmongodb\b",
        r"\bredis\b", r"\bsqlite\b", r"\bmariadb\b", r"\bmssql\b", r"\bsql_server\b",
        r"\bcassandra\b", r"\belasticsearch\b", r"\bcouchdb\b", r"\bfirebird\b",
        r"\bdb2\b", r"\bsybase\b", r"\binformix\b", r"\bneo4j\b", r"\bdynamodb\b",
        r"\binfluxdb\b", r"\btimescaledb\b"
    ],
    
    # === Browsers ===
    "browser": [
        r"\bchrome\b", r"\bchromium\b", r"\bfirefox\b", r"\bsafari\b", r"\bedge\b",
        r"\bopera\b", r"\bie\b", r"\binternet_explorer\b", r"\bwebkit\b", r"\bblink\b",
        r"\bgecko\b", r"\bbrave\b", r"\bvivaldi\b"
    ],
    
    # === Development Frameworks ===
    "framework": [
        r"\bdjango\b", r"\bflask\b", r"\brails\b", r"\bruby_on_rails\b", r"\blaravel\b",
        r"\bspring\b", r"\bstruts\b", r"\bangular\b", r"\breact\b", r"\bvue\b",
        r"\bexpress\b", r"\bsymfony\b", r"\bcodeigniter\b", r"\bcakephp\b",
        r"\bdotnet\b", r"\.net\b", r"\basp\.net\b", r"\bentity_framework\b",
        r"\bhibernate\b", r"\bjquery\b", r"\bbootstrap\b", r"\bnodejs\b", r"\bnode\.js\b",
        r"\bnextjs\b", r"\bnuxt\b", r"\bfastapi\b", r"\bgin\b", r"\becho\b",
        r"\bsvelte\b", r"\bember\b", r"\bbackbone\b"
    ],
    
    # === Libraries ===
    "library": [
        r"\bopenssl\b", r"\blibssl\b", r"\blibcrypto\b", r"\bgnutls\b", r"\bzlib\b",
        r"\blibpng\b", r"\blibjpeg\b", r"\blibxml\b", r"\blibcurl\b", r"\bcurl\b",
        r"\bexpat\b", r"\bfreetype\b", r"\bicu\b", r"\bboost\b", r"\bpcre\b",
        r"\bglibc\b", r"\blibc\b", r"\blibssh\b", r"\blibgit\b", r"\blibarchive\b",
        r"\bprotobuf\b", r"\bjson\b", r"\byaml\b", r"\bsqlalchemy\b", r"\bnumpy\b",
        r"\bpandas\b", r"\bscipy\b", r"\btensorflow\b", r"\bpytorch\b", r"\bopencv\b",
        r"\blog4j\b", r"\bcommons\b", r"\bguava\b", r"\bjackson\b", r"\bgson\b",
        r"\blodash\b", r"\bmoment\b", r"\baxios\b"
    ],
    
    # === Network Services & Protocols ===
    "network": [
        r"\bssh\b", r"\bopenssh\b", r"\bftp\b", r"\btelnet\b", r"\bsmtp\b",
        r"\bdns\b", r"\bbind\b", r"\bdhcp\b", r"\bsnmp\b", r"\bldap\b",
        r"\bsamba\b", r"\bnfs\b", r"\bipsec\b", r"\bproxy\b", r"\bsquid\b",
        r"\btor\b", r"\biptables\b", r"\bnftables\b"
    ],
    
    # === Firmware & Embedded ===
    "firmware": [
        r"\bfirmware\b", r"\bbios\b", r"\buefi\b", r"\bbootloader\b", r"\bgrub\b",
        r"\bu-boot\b", r"\bembedded\b", r"\brouter_firmware\b"
    ],
    
    # === Drivers ===
    "driver": [
        r"\bdriver\b", r"\bgraphics_driver\b", r"\bnvidia\b", r"\bamd_driver\b",
        r"\bintel_driver\b", r"\busb_driver\b", r"\bnetwork_driver\b"
    ],
    
    # === Virtualization & Containers ===
    "virtualization": [
        r"\bvmware\b", r"\bvirtualbox\b", r"\bhyper-v\b", r"\bxen\b", r"\bqemu\b",
        r"\bdocker\b", r"\bkubernetes\b", r"\bk8s\b", r"\bcontainer\b", r"\bpodman\b",
        r"\blxc\b", r"\blxd\b", r"\bvagrant\b", r"\bproxmox\b", r"\bopenstack\b"
    ],
    
    # === Content Management Systems ===
    "cms": [
        r"\bwordpress\b", r"\bjoomla\b", r"\bdrupal\b", r"\bmagento\b", r"\btypo3\b",
        r"\bprestashop\b", r"\bopencart\b", r"\bwoocommerce\b", r"\bshopify\b",
        r"\bghost\b", r"\bhugo\b", r"\bjekyll\b", r"\bcontentful\b", r"\bstrapi\b"
    ],
    
    # === Mail Servers ===
    "mail_server": [
        r"\bsendmail\b", r"\bpostfix\b", r"\bexim\b", r"\bqmail\b", r"\bdovecot\b",
        r"\bcourier\b", r"\bexchange\b", r"\bzimbra\b", r"\broundcube\b",
        r"\bhorde\b", r"\bsquirrelmail\b"
    ],
    
    # === ERP Systems ===
    "erp": [
        r"\bsap\b", r"\boracle_ebs\b", r"\boracle_e-business\b", r"\bnetsuit\b",
        r"\bmicrosoft_dynamics\b", r"\bdynamics_365\b", r"\bdynamics_ax\b",
        r"\bdynamics_nav\b", r"\bodoo\b", r"\bopenerp\b", r"\berp\b",
        r"\binfor\b", r"\bepicor\b", r"\bsage\b", r"\bworkday\b",
        r"\bpeoplesoft\b", r"\bjd_edwards\b", r"\bsiebel\b", r"\bibus\b",
        r"\bqad\b", r"\bdeltek\b", r"\bacumatica\b", r"\bunit4\b"
    ],
    
    # === CRM Systems ===
    "crm": [
        r"\bsalesforce\b", r"\bcrm\b", r"\bhubspot\b", r"\bzoho\b",
        r"\bmicrosoft_dynamics_crm\b", r"\bsugarcrm\b", r"\bsuitecrm\b",
        r"\bvtiger\b", r"\bpipedrive\b", r"\bfreshsales\b", r"\binsightly\b",
        r"\bzendesk\b", r"\bsaleslogix\b", r"\bnimble\b"
    ],
    
    # === Security Software ===
    "antivirus": [
        r"\bantivirus\b", r"\banti-virus\b", r"\bantimalware\b", r"\bnorton\b",
        r"\bmcafee\b", r"\bkaspersky\b", r"\bavast\b", r"\bavira\b", r"\bbitdefender\b",
        r"\bmalwarebytes\b", r"\beset\b", r"\bsophos\b", r"\btrend_micro\b",
        r"\bsymantec\b", r"\bclamav\b", r"\bcomodo\b", r"\bwindows_defender\b"
    ],
    "firewall_software": [
        r"\bpfsense\b", r"\bopnsense\b", r"\bzonealarm\b", r"\bcomodo_firewall\b",
        r"\buntangle\b", r"\bsmoothwall\b", r"\bipfire\b", r"\bclearos\b"
    ],
    "identity_management": [
        r"\bokta\b", r"\bauth0\b", r"\bkeycloak\b", r"\badfs\b", r"\bactive_directory\b",
        r"\bldap\b", r"\bopenldap\b", r"\bfreeipa\b", r"\bshibboleth\b", r"\bsaml\b",
        r"\boauth\b", r"\boidc\b", r"\bsso\b", r"\bping_identity\b", r"\bonelogin\b"
    ],
    "vpn": [
        r"\bvpn\b", r"\bopenvpn\b", r"\bwireguard\b", r"\bcisco_anyconnect\b",
        r"\bfortivpn\b", r"\bpulse_secure\b", r"\bglobalprotect\b", r"\bnordvpn\b",
        r"\bexpressvpn\b", r"\bipsec\b", r"\bstrongwan\b", r"\blibreswan\b"
    ],
    "encryption": [
        r"\bveracrypt\b", r"\btruecrypt\b", r"\bbitlocker\b", r"\bfilevault\b",
        r"\bgpg\b", r"\bgnupg\b", r"\bpgp\b", r"\bage\b", r"\bcryptsetup\b",
        r"\bluks\b", r"\bkeepass\b", r"\bbitwarden\b", r"\blastpass\b", r"\b1password\b"
    ],
    
    # === Development & DevOps ===
    "ide": [
        r"\bvscode\b", r"\bvisual_studio\b", r"\bintellij\b", r"\bpycharm\b",
        r"\bwebstorm\b", r"\bphpstorm\b", r"\beclipse\b", r"\bnetbeans\b",
        r"\bxcode\b", r"\bandroid_studio\b", r"\batom\b", r"\bsublime\b",
        r"\bvim\b", r"\bneovim\b", r"\bemacs\b"
    ],
    "version_control": [
        r"\bgit\b", r"\bsvn\b", r"\bsubversion\b", r"\bmercurial\b", r"\bhg\b",
        r"\bgitlab\b", r"\bgithub\b", r"\bbitbucket\b", r"\bgitea\b", r"\bgogs\b"
    ],
    "ci_cd": [
        r"\bjenkins\b", r"\bgitlab_ci\b", r"\bgithub_actions\b", r"\bcircleci\b",
        r"\btravis\b", r"\bbamboo\b", r"\bteamcity\b", r"\bazure_devops\b",
        r"\bargo\b", r"\btekton\b", r"\bdrone\b", r"\bconcourse\b"
    ],
    "package_manager": [
        r"\bnpm\b", r"\byarn\b", r"\bpip\b", r"\bconda\b", r"\bmaven\b",
        r"\bgradle\b", r"\bnuget\b", r"\bcomposer\b", r"\bcargo\b", r"\bgem\b",
        r"\bapt\b", r"\byum\b", r"\bdnf\b", r"\bbrew\b", r"\bhomebrew\b",
        r"\bchocolatey\b", r"\bsnap\b", r"\bflatpak\b"
    ],
    "api_gateway": [
        r"\bkong\b", r"\bapigee\b", r"\btyk\b", r"\baws_api_gateway\b",
        r"\bazure_api_management\b", r"\benvoy\b", r"\bambassador\b", r"\btraefik\b"
    ],
    
    # === Cloud & Infrastructure ===
    "cloud_platform": [
        r"\baws\b", r"\bamazon_web_services\b", r"\bazure\b", r"\bgcp\b",
        r"\bgoogle_cloud\b", r"\bdigitalocean\b", r"\blinode\b", r"\bvultr\b",
        r"\bheroku\b", r"\bcloudflare\b", r"\bakamai\b", r"\bfastly\b",
        r"\balibaba_cloud\b", r"\bibm_cloud\b", r"\boracle_cloud\b"
    ],
    "load_balancer": [
        r"\bhaproxy\b", r"\bf5\b", r"\bnginx_plus\b", r"\btraefik\b", r"\benvoy\b",
        r"\belb\b", r"\balb\b", r"\bnlb\b", r"\bcitrix\b", r"\bnetscaler\b",
        r"\bkemp\b", r"\ba10\b"
    ],
    "message_queue": [
        r"\brabbitmq\b", r"\bkafka\b", r"\bactivemq\b", r"\bzeromq\b", r"\bnats\b",
        r"\bsqs\b", r"\bazure_service_bus\b", r"\bgoogle_pubsub\b", r"\bpulsar\b",
        r"\bcelery\b", r"\bbull\b", r"\bsidekiq\b"
    ],
    "storage": [
        r"\bminio\b", r"\bceph\b", r"\bglusterfs\b", r"\bnfs\b", r"\biscsi\b",
        r"\bs3\b", r"\bazure_blob\b", r"\bgcs\b", r"\bnetapp\b", r"\bemc\b",
        r"\bpure_storage\b", r"\bqnap\b", r"\bsynology\b", r"\btruenas\b"
    ],
    "backup": [
        r"\bveeam\b", r"\bacronis\b", r"\bbacula\b", r"\brestic\b", r"\bborg\b",
        r"\bcommvault\b", r"\bveritas\b", r"\bduplicity\b", r"\brclone\b",
        r"\brsync\b", r"\bnetbackup\b", r"\barcserve\b"
    ],
    
    # === Monitoring & Logging ===
    "monitoring": [
        r"\bnagios\b", r"\bzabbix\b", r"\bprometheus\b", r"\bgrafana\b",
        r"\bdatadog\b", r"\bnew_relic\b", r"\bappdynamics\b", r"\bdynatrace\b",
        r"\bprtg\b", r"\bicinga\b", r"\bsensu\b", r"\bcacti\b", r"\bnetdata\b",
        r"\bsolarwinds\b", r"\bopsview\b"
    ],
    "logging": [
        r"\belk\b", r"\belasticsearch\b", r"\blogstash\b", r"\bkibana\b",
        r"\bsplunk\b", r"\bgraylog\b", r"\bfluentd\b", r"\bfluentbit\b",
        r"\bloki\b", r"\bpapertrail\b", r"\bloggly\b", r"\bsumo_logic\b"
    ],
    
    # === Collaboration & Productivity ===
    "collaboration": [
        r"\bslack\b", r"\bteams\b", r"\bdiscord\b", r"\bmattermost\b",
        r"\brocket\.chat\b", r"\bzulip\b", r"\belement\b", r"\bmatrix\b"
    ],
    "video_conferencing": [
        r"\bzoom\b", r"\bwebex\b", r"\bgoogle_meet\b", r"\bjitsi\b",
        r"\bgotomeeting\b", r"\bblue_jeans\b", r"\bskype\b", r"\bwherebye\b"
    ],
    "document_management": [
        r"\bsharepoint\b", r"\bconfluence\b", r"\bnotion\b", r"\balfresco\b",
        r"\bdocuware\b", r"\bm-files\b", r"\bopentext\b", r"\bbox\b",
        r"\bdropbox\b", r"\bgoogle_drive\b", r"\bonedrive\b"
    ],
    "project_management": [
        r"\bjira\b", r"\basana\b", r"\btrello\b", r"\bmonday\b", r"\bbasecamp\b",
        r"\bclickup\b", r"\bwrike\b", r"\bredmine\b", r"\btaiga\b", r"\bopenproject\b"
    ],
    
    # === Networking Hardware/Software ===
    "router": [
        r"\bcisco\b", r"\bjuniper\b", r"\bmikrotik\b", r"\bubiquiti\b",
        r"\bnetgear\b", r"\btp-link\b", r"\basus_router\b", r"\blinksys\b",
        r"\bd-link\b", r"\bfortinet\b", r"\bpalo_alto\b", r"\barista\b"
    ],
    "wireless": [
        r"\bwifi\b", r"\bwireless\b", r"\bunifi\b", r"\baruba\b", r"\bruckus\b",
        r"\bmeraki\b", r"\bmist\b", r"\baerohive\b", r"\bextreme_wireless\b"
    ],
    "voip": [
        r"\basterisk\b", r"\bfreepbx\b", r"\bcisco_voip\b", r"\bavaya\b",
        r"\bgenesys\b", r"\bringcentral\b", r"\btwilio\b", r"\b3cx\b",
        r"\bsip\b", r"\bvoip\b", r"\bfreeswitch\b", r"\bkamailio\b"
    ],
    
    # === Industrial & IoT ===
    "scada": [
        r"\bscada\b", r"\bsiemens\b", r"\bschneider\b", r"\babb\b",
        r"\bhoneywell\b", r"\brockwell\b", r"\bemerson\b", r"\byokogawa\b",
        r"\bge_digital\b", r"\bwonderware\b", r"\bignition\b", r"\bopc\b"
    ],
    "plc": [
        r"\bplc\b", r"\bprogrammable_logic\b", r"\ballen_bradley\b",
        r"\bsimatic\b", r"\bmodicon\b", r"\bomron\b", r"\bmitsubishi_plc\b"
    ],
    "iot_device": [
        r"\biot\b", r"\bsmart_home\b", r"\bhome_assistant\b", r"\bopenhab\b",
        r"\btuya\b", r"\btasmota\b", r"\besphome\b", r"\bzigbee\b", r"\bz-wave\b",
        r"\bmqtt\b", r"\bnest\b", r"\bring\b", r"\bwyze\b"
    ],
    "medical_device": [
        r"\bmedical\b", r"\bhealthcare\b", r"\bdicom\b", r"\bhl7\b", r"\bfhir\b",
        r"\bpacs\b", r"\bepic\b", r"\bcerner\b", r"\bmeditech\b", r"\ballscripts\b"
    ],
    
    # === Media & Content ===
    "media_server": [
        r"\bplex\b", r"\bemby\b", r"\bjellyfin\b", r"\bkodi\b", r"\bsubsonic\b",
        r"\bairsonic\b", r"\bnavidrome\b"
    ],
    "streaming": [
        r"\bstreaming\b", r"\bobs\b", r"\bffmpeg\b", r"\bwowza\b", r"\bnginx_rtmp\b",
        r"\bred5\b", r"\bant_media\b", r"\blivestream\b"
    ],
    "graphics": [
        r"\bphotoshop\b", r"\bgimp\b", r"\billustrator\b", r"\binkscape\b",
        r"\bblender\b", r"\bmaya\b", r"\b3ds_max\b", r"\bcinema_4d\b",
        r"\bpremiere\b", r"\bdavinci\b", r"\bfinal_cut\b", r"\bafter_effects\b"
    ],
    
    # === E-commerce & Payments ===
    "payment": [
        r"\bstripe\b", r"\bpaypal\b", r"\bsquare\b", r"\bbraintree\b",
        r"\badyen\b", r"\bworldpay\b", r"\bauthorize\.net\b", r"\bpos\b",
        r"\bpoint_of_sale\b", r"\bklarna\b", r"\bafterpy\b"
    ],
    "ecommerce": [
        r"\becommerce\b", r"\be-commerce\b", r"\bshopware\b", r"\bwix\b",
        r"\bbigcommerce\b", r"\bsquarespace\b", r"\bvolusion\b", r"\b3dcart\b"
    ],
    
    # === General Applications (keep at end for lower priority) ===
    "application": [
        r"\boffice\b", r"\bacrobat\b", r"\bpdf\b", r"\bvlc\b",
        r"\bjava\b", r"\bpython\b", r"\bphp\b", r"\bruby\b", r"\bperl\b",
        r"\bgo\b", r"\brust\b", r"\bgcc\b", r"\bclang\b", r"\bllvm\b",
        r"\bcompiler\b", r"\binterpreter\b"
    ]
}

def categorize_product(product_text, vendor_text="", cwe_desc=""):
    """
    Categorize a software product based on its name, vendor, and CWE description.
    
    Args:
        product_text: Product name(s) from the CVE data
        vendor_text: Vendor name(s) from the CVE data
        cwe_desc: CWE description for additional context
    
    Returns:
        Category string
    """
    # Combine all text for searching
    combined_text = f"{product_text} {vendor_text} {cwe_desc}".lower()
    
    # Handle empty or n/a values
    if not combined_text or combined_text.strip() in ["", "n/a", "n/a n/a", "n/a n/a "]:
        return "unknown"
    
    # Check each category's patterns
    for category, patterns in CATEGORY_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, combined_text, re.IGNORECASE):
                return category
    
    return "other"

def add_category_column(df):
    """
    Add a category column to the DataFrame based on product information.
    
    Args:
        df: DataFrame with CVE data
    
    Returns:
        DataFrame with added 'category' column
    """
    print("\nAdding category column...")
    
    # Determine which columns to use for categorization
    product_col = None
    vendor_col = None
    cwe_col = None
    
    # Check for product columns (handle both original and merged files)
    for col in ["impacted_products", "impacted_products_file1", "impacted_products_file2"]:
        if col in df.columns:
            product_col = col
            break
    
    for col in ["impacted_vendor", "impacted_vendor_file1", "impacted_vendor_file2"]:
        if col in df.columns:
            vendor_col = col
            break
    
    for col in ["cwe_description", "cwe_description_file1", "cwe_description_file2"]:
        if col in df.columns:
            cwe_col = col
            break
    
    print(f"  - Using product column: {product_col}")
    print(f"  - Using vendor column: {vendor_col}")
    print(f"  - Using CWE column: {cwe_col}")
    
    # Apply categorization
    def apply_category(row):
        product = str(row.get(product_col, "")) if product_col else ""
        vendor = str(row.get(vendor_col, "")) if vendor_col else ""
        cwe = str(row.get(cwe_col, "")) if cwe_col else ""
        return categorize_product(product, vendor, cwe)
    
    df["category"] = df.apply(apply_category, axis=1)
    
    return df

def print_category_statistics(df):
    """Print statistics about the category distribution."""
    print("\nCategory Distribution:")
    print("-" * 40)
    category_counts = df["category"].value_counts()
    total = len(df)
    
    for category, count in category_counts.items():
        percentage = (count / total) * 100
        print(f"  {category:20s}: {count:8d} ({percentage:5.2f}%)")
    
    print("-" * 40)
    print(f"  {'Total':20s}: {total:8d}")

def main():
    """Main function to add category column to CVE data."""
    print("=" * 60)
    print("CVE Category Classification Script")
    print("=" * 60)
    
    # Determine input file
    input_file = INPUT_FILE
    output_file = OUTPUT_FILE
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"\nInput file not found: {input_file}")
        print("Trying alternative input file...")
        
        # Try original file
        alt_file = os.path.join(SCRIPT_DIR, "cve_data.csv")
        if os.path.exists(alt_file):
            input_file = alt_file
            output_file = os.path.join(SCRIPT_DIR, "categorized_cve_data.csv")
            print(f"Using: {input_file}")
        else:
            print("No suitable input file found!")
            return
    
    # Read CSV file
    print(f"\nReading {os.path.basename(input_file)}...")
    df = pd.read_csv(input_file, low_memory=False)
    print(f"  - Rows: {len(df)}, Columns: {len(df.columns)}")
    
    # Add category column
    df = add_category_column(df)
    
    # Print statistics
    print_category_statistics(df)
    
    # Save the result
    print(f"\nSaving categorized data to {os.path.basename(output_file)}...")
    df.to_csv(output_file, index=False)
    print(f"  - File saved successfully!")
    
    print("\n" + "=" * 60)
    print("Categorization completed successfully!")
    print(f"Output file: {output_file}")
    print("=" * 60)

if __name__ == "__main__":
    main()
