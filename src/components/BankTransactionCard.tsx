import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Unlock,
  Shield,
  Eye,
  EyeOff,
  User,
  KeyRound,
  IndianRupee,
  List,
} from "lucide-react";

interface Transaction {
  date: string;
  description: string;
  scheme: string;
  amount: string;
  type: "Credit" | "Debit";
}

interface BankTransactionsCardProps {
  transactions: Transaction[];
}
const realTransactions = [
  {
    account_id: 1,
    village_name: "PUNE",
    transactions: [
      {
        account_id: 1,
        transaction_id: "S64767998",
        transaction_date: "2023-10-20",
        transaction_start_date: "2023-10-20",
        value_date: "2023-10-20",
        transaction_amount: 2939553,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars: "SGB/SGBO/BULK-SGBO-0001091399-TXN",
        transaction_particulars_2: null,
        transaction_remark: "T20J20S27598//104SLSGBOPL",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 155853931,
        rank: 95,
      },
      {
        account_id: 1,
        transaction_id: "S84212733",
        transaction_date: "2023-10-11",
        transaction_start_date: "2023-10-11",
        value_date: "2023-10-11",
        transaction_amount: 467371,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "SGB/SGBO-0001081811-TXN_ZILLA PARISAD VIKAS YOJNA",
        transaction_particulars_2: null,
        transaction_remark: "T20J11R26868//104SLSGBOPL",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 158793484,
        rank: 170,
      },
    ],
  },
  {
    account_id: 2,
    village_name: "HAVELI",
    transactions: [
      {
        account_id: 2,
        transaction_id: "S97547315",
        transaction_date: "2023-04-06",
        transaction_start_date: "2023-04-06",
        value_date: "2023-04-06",
        transaction_amount: 1408,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20230406MD001D/R042301936549/0046EATPAYREQ05",
        transaction_particulars_2: null,
        transaction_remark: "MHTK000004E6//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 33775899,
        rank: 293,
      },
      {
        account_id: 2,
        transaction_id: "S87961896",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 249750,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD0CWY/R032416378711/0046EATPAYREQ28",
        transaction_particulars_2: null,
        transaction_remark: "MIL600000JLT//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 298,
      },
      {
        account_id: 2,
        transaction_id: "S94214485",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 25423,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD1DRQ/R032417319904/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL6000029X8//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 300,
      },
      {
        account_id: 2,
        transaction_id: "S90921920",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 25423,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD16X6/R032417157935/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL600001Y4H//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 333,
      },
      {
        account_id: 2,
        transaction_id: "S91241589",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 474576,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD17L2/R032417161728/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL600001YOC//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 337,
      },
      {
        account_id: 2,
        transaction_id: "S87603888",
        transaction_date: "2024-03-28",
        transaction_start_date: "2024-03-28",
        value_date: "2024-03-28",
        transaction_amount: 99996,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240328MD14CY/R032416207215/0046EATPAYREQ28",
        transaction_particulars_2: null,
        transaction_remark: "MIL400001WF9//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 351,
      },
      {
        account_id: 2,
        transaction_id: "S91869740",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 474576,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD1909/R032417187073/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL6000021GU//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 25233455,
        rank: 353,
      },
      {
        account_id: 2,
        transaction_id: "S97547382",
        transaction_date: "2023-04-06",
        transaction_start_date: "2023-04-06",
        value_date: "2023-04-06",
        transaction_amount: 3408,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20230406MD0023/R042301937880/0046EATPAYREQ05",
        transaction_particulars_2: null,
        transaction_remark: "MHTK000002UR//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 33775899,
        rank: 359,
      },
    ],
  },
  {
    account_id: 3,
    village_name: "DHOKSANGHAVI",
    transactions: [
      {
        account_id: 3,
        transaction_id: "S49930337",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 526336,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095389057-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401129427//501066654",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 3676424.24,
        rank: 384,
      },
    ],
  },
  {
    account_id: 4,
    village_name: "DHAMARI",
    transactions: [
      {
        account_id: 4,
        transaction_id: "S78160677",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 120000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD00JK/R012410290212/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ000003XF//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 2972961,
        rank: 419,
      },
      {
        account_id: 4,
        transaction_id: "S40602429",
        transaction_date: "2023-05-31",
        transaction_start_date: "2023-05-31",
        value_date: "2023-05-31",
        transaction_amount: 95000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20230531MD018E/R052304185037/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MHV3000002M9//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 5568590,
        rank: 435,
      },
      {
        account_id: 4,
        transaction_id: "S49932969",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 688800,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095389149-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401131704//501066670",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 4144280,
        rank: 445,
      },
    ],
  },
  {
    account_id: 5,
    village_name: "RAVADEWADI",
    transactions: [
      {
        account_id: 5,
        transaction_id: "S49931184",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 192068,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095389127-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401131439//501066676",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 1208157.32,
        rank: 490,
      },
    ],
  },
  {
    account_id: 6,
    village_name: "TALEGAON DHAM DHERE",
    transactions: [
      {
        account_id: 6,
        transaction_id: "S98927992",
        transaction_date: "2024-07-04",
        transaction_start_date: "2024-07-04",
        value_date: "2024-07-04",
        transaction_amount: 135400,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240704MD021A/R072400337172/0046EATPAYREQ03",
        transaction_particulars_2: null,
        transaction_remark: "MINU000002XS//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 19013198.8,
        rank: 577,
      },
      {
        account_id: 6,
        transaction_id: "S91047495",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 79886,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD0HNF/R012410695294/0046EATPAYREQ31",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ00000X71//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 17917053.8,
        rank: 582,
      },
      {
        account_id: 6,
        transaction_id: "S90706836",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 96000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD0HBI/R012410689016/0046EATPAYREQ31",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ00000VE9//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 17917053.8,
        rank: 614,
      },
      {
        account_id: 6,
        transaction_id: "S85770821",
        transaction_date: "2024-06-01",
        transaction_start_date: "2024-06-01",
        value_date: "2024-06-01",
        transaction_amount: 400000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240601MD013W/R052405383233/0046EATPAYREQ31",
        transaction_particulars_2: null,
        transaction_remark: "MIMX000002HP//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 18973691.8,
        rank: 622,
      },
      {
        account_id: 6,
        transaction_id: "S49929476",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 2712381,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390069-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401131137//501066678",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 21312031.8,
        rank: 624,
      },
    ],
  },
  {
    account_id: 7,
    village_name: "URULI KANCHAN",
    transactions: [
      {
        account_id: 7,
        transaction_id: "S49932104",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 5340006,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390293-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401131609//501066679",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 13723871,
        rank: 740,
      },
    ],
  },
  {
    account_id: 8,
    village_name: "DONGERGAON",
    transactions: [
      {
        account_id: 8,
        transaction_id: "S49937146",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 436821,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390727-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134023//501066684",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 5629884.43,
        rank: 827,
      },
      {
        account_id: 8,
        transaction_id: "S86275439",
        transaction_date: "2024-06-01",
        transaction_start_date: "2024-06-01",
        value_date: "2024-06-01",
        transaction_amount: 20000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240601MD01NL/R052405402332/0046EATPAYREQ31",
        transaction_particulars_2: null,
        transaction_remark: "MIMX000002SL//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 5262061.43,
        rank: 847,
      },
    ],
  },
  {
    account_id: 9,
    village_name: "SORTAPWADI",
    transactions: [
      {
        account_id: 9,
        transaction_id: "S49934663",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 1121745,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390729-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401129744//501066685",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 7089918.5,
        rank: 920,
      },
    ],
  },
  {
    account_id: 10,
    village_name: "BURKEGAON",
    transactions: [
      {
        account_id: 10,
        transaction_id: "S49937230",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 354708,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390710-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134040//501066686",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 2164865,
        rank: 966,
      },
    ],
  },
  {
    account_id: 11,
    village_name: "VADAKI",
    transactions: [
      {
        account_id: 11,
        transaction_id: "S49933093",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 1477510,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390253-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401131683//501066687",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 1817829.2,
        rank: 987,
      },
      {
        account_id: 11,
        transaction_id: "S87838174",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 496872,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD09DT/R032416403493/0046EATPAYREQ28",
        transaction_particulars_2: null,
        transaction_remark: "MIL600000EFY//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 340319.2,
        rank: 990,
      },
    ],
  },
  {
    account_id: 12,
    village_name: "BIVARI",
    transactions: [
      {
        account_id: 12,
        transaction_id: "S49939283",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 169513,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390711-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134027//501066689",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 987845,
        rank: 1073,
      },
    ],
  },
  {
    account_id: 13,
    village_name: "NAIGAON",
    transactions: [
      {
        account_id: 13,
        transaction_id: "S49934656",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 630122,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390521-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401129737//501066690",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 3860876.72,
        rank: 1097,
      },
      {
        account_id: 13,
        transaction_id: "S99527162",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 6415,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD1JRT/R032417433228/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL600002HAU//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 3230754.72,
        rank: 1139,
      },
      {
        account_id: 13,
        transaction_id: "S91646947",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 50000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240330MD18K7/R032417172231/0046EATPAYREQ29",
        transaction_particulars_2: null,
        transaction_remark: "MIL60000212G//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 3230754.72,
        rank: 1140,
      },
    ],
  },
  {
    account_id: 14,
    village_name: "PERANE",
    transactions: [
      {
        account_id: 14,
        transaction_id: "S62283473",
        transaction_date: "2023-10-20",
        transaction_start_date: "2023-10-20",
        value_date: "2023-10-20",
        transaction_amount: 53400,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20231020MD03DG/R102303696165/0046EATPAYREQ19",
        transaction_particulars_2: null,
        transaction_remark: "MHZ1000003LP//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 7773600,
        rank: 1177,
      },
      {
        account_id: 14,
        transaction_id: "S87611577",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 300000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240328MD14N1/R032416213195/0046EATPAYREQ28",
        transaction_particulars_2: null,
        transaction_remark: "MIL400001VEA//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 8198908,
        rank: 1181,
      },
      {
        account_id: 14,
        transaction_id: "S49937135",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 1584645,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390720-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134013//501066691",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 9783553,
        rank: 1189,
      },
      {
        account_id: 14,
        transaction_id: "S62574659",
        transaction_date: "2023-10-20",
        transaction_start_date: "2023-10-20",
        value_date: "2023-10-20",
        transaction_amount: 49998,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20231020MD03PM/R102303707782/0046EATPAYREQ19",
        transaction_particulars_2: null,
        transaction_remark: "MHZ1000003TP//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 7773600,
        rank: 1229,
      },
      {
        account_id: 14,
        transaction_id: "S87612519",
        transaction_date: "2024-03-30",
        transaction_start_date: "2024-03-30",
        value_date: "2024-03-30",
        transaction_amount: 269000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240328MD14O3/R032416214533/0046EATPAYREQ28",
        transaction_particulars_2: null,
        transaction_remark: "MIL400001VEQ//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 8198908,
        rank: 1233,
      },
    ],
  },
  {
    account_id: 15,
    village_name: "INAMGAON",
    transactions: [
      {
        account_id: 15,
        transaction_id: "S49937113",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 935845,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390927-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134005//501066692",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 7505348,
        rank: 1280,
      },
      {
        account_id: 15,
        transaction_id: "S11097327",
        transaction_date: "2024-05-24",
        transaction_start_date: "2024-05-24",
        value_date: "2024-05-24",
        transaction_amount: 16500,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240524MD026O/R052403703959/0046EATPAYREQ24",
        transaction_particulars_2: null,
        transaction_remark: "MIMP000002OS//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 7267358,
        rank: 1296,
      },
      {
        account_id: 15,
        transaction_id: "S10897352",
        transaction_date: "2024-05-24",
        transaction_start_date: "2024-05-24",
        value_date: "2024-05-24",
        transaction_amount: 16900,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240524MD0225/R052403698365/0046EATPAYREQ24",
        transaction_particulars_2: null,
        transaction_remark: "MIMP0000017H//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 7267358,
        rank: 1301,
      },
      {
        account_id: 15,
        transaction_id: "S10872485",
        transaction_date: "2024-05-24",
        transaction_start_date: "2024-05-24",
        value_date: "2024-05-24",
        transaction_amount: 52300,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240524MD020P/R052403698367/0046EATPAYREQ24",
        transaction_particulars_2: null,
        transaction_remark: "MIMP000002M9//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 7267358,
        rank: 1320,
      },
    ],
  },
  {
    account_id: 16,
    village_name: "JAMBHALI",
    transactions: [
      {
        account_id: 16,
        transaction_id: "S49937215",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 121232,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390537-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401134002//501066693",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 1209212,
        rank: 1366,
      },
    ],
  },
  {
    account_id: 17,
    village_name: "MANDAVI KH",
    transactions: [
      {
        account_id: 17,
        transaction_id: "S49936055",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 112421,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390699-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401132175//501066697",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 1138956,
        rank: 1414,
      },
    ],
  },
  {
    account_id: 18,
    village_name: "BAHULI",
    transactions: [
      {
        account_id: 18,
        transaction_id: "S49936056",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 248454,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390682-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401132177//501066698",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 1872874,
        rank: 1447,
      },
    ],
  },
  {
    account_id: 19,
    village_name: "THEUR",
    transactions: [
      {
        account_id: 19,
        transaction_id: "S83129229",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 102556,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD06ZE/R012410469216/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ00000EUX//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1512,
      },
      {
        account_id: 19,
        transaction_id: "S82444288",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 105362,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD02M1/R012410443107/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ000007G5//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1517,
      },
      {
        account_id: 19,
        transaction_id: "S82456446",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 29370,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD02QO/R012410443159/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ000007K4//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1525,
      },
      {
        account_id: 19,
        transaction_id: "S49935733",
        transaction_date: "2024-04-04",
        transaction_start_date: "2024-04-04",
        value_date: "2024-04-04",
        transaction_amount: 1704643,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "NEFT-SBIN424095390539-GOVT  OF MAHARASHTRA-/ATTN//",
        transaction_particulars_2: "INB-00000038851908910-SBIN0000TBU",
        transaction_remark: "040401132092//501066699",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "C",
        participant_transaction_serial_no: 2,
        clear_balance: 12965388,
        rank: 1545,
      },
      {
        account_id: 19,
        transaction_id: "S82480698",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 112000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD033C/R012410443169/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ000006DD//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1548,
      },
      {
        account_id: 19,
        transaction_id: "S83119095",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 43000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD06Y0/R012410469148/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ00000EU2//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1555,
      },
      {
        account_id: 19,
        transaction_id: "S82183059",
        transaction_date: "2024-01-31",
        transaction_start_date: "2024-01-31",
        value_date: "2024-01-31",
        transaction_amount: 42000,
        transaction_type: "T",
        instrument_number: null,
        instrument_type: null,
        transaction_particulars:
          "PFM/PI20240131MD01YC/R012410442233/0046EATPAYREQ30",
        transaction_particulars_2: null,
        transaction_remark: "MIJJ000005C0//104SL00PFMS",
        transaction_subtype: "CI",
        module_id: "DCI",
        participant_transaction_type: "D",
        participant_transaction_serial_no: 1,
        clear_balance: 12317897,
        rank: 1562,
      },
    ],
  },
];
const BankTransactionsCard = ({
  isUnlocked,
  handleUnlockClick,
  villageName,
  setCurrentBalance
}: any) => {
  console.log(realTransactions.filter((item) => item?.village_name === villageName?.toUpperCase()),villageName?.toUpperCase(),"villageName")
  const transactions =
    realTransactions.filter((item) => item?.village_name === villageName?.toUpperCase())?.[0]
      ?.transactions || [];

  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.transaction_date).getTime() -
      new Date(a.transaction_date).getTime()
  );

  const latestClearBalance = sortedTransactions[0]?.clear_balance || 0;
  useEffect(()=>{
setCurrentBalance(latestClearBalance)
  },[])
  return (
    <>
      <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden relative">
        <CardHeader className="bg-gradient-to-r flex flex-row justify-between from-green-50 to-teal-50 border-b border-green-100/50">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
              Recent Financial Transactions
            </CardTitle>
            <CardDescription className="text-gray-600">
              Latest fund movements and payments (Last 5 transactions)
            </CardDescription>
          </div>
          {isUnlocked && (
            <div>
              <div className="flex items-center gap-2">
                <div className="">
                  <p className="text-gray-600 font-medium">Bank Balance:</p>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ₹ {latestClearBalance.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0 relative">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-green-50">
                  <TableHead className="font-bold text-gray-700">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Transaction ID
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Remark / Particulars
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Module
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Amount
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Clear Balance
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Type
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.transaction_id}
                    className="hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-300"
                  >
                    <TableCell className="font-medium">
                      {new Date(transaction.transaction_date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})}
                    </TableCell>

                    <TableCell className="font-mono text-sm text-gray-600">
                      {transaction.transaction_id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {transaction.transaction_remark ||
                        transaction.transaction_particulars}
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 border-0 shadow-lg">
                        {transaction.module_id || "N/A"}
                      </Badge>
                    </TableCell>

                    <TableCell
                      className={`font-semibold ${
                        transaction.participant_transaction_type === "C"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ₹{Number(transaction.transaction_amount).toLocaleString()}
                    </TableCell>

                    <TableCell className="text-gray-800 font-medium">
                      ₹{Number(transaction.clear_balance).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          transaction.participant_transaction_type === "C"
                            ? "bg-gradient-to-r from-green-100 to-emerald-200 text-green-600 border-0 shadow-lg"
                            : "bg-gradient-to-r from-red-100 to-pink-100 text-red-400 border-0 shadow-lg"
                        }
                      >
                        {transaction.participant_transaction_type === "C"
                          ? "Credit"
                          : "Debit"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {sortedTransactions.length === 0 && (
              <div className="flex flex-col items-center w-full justify-center py-16 text-center">
                <div className="p-4 bg-slate-100 rounded-full mb-6">
                  <List className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No transactions found
                </h3>
              </div>
            )}
          </div>

          {/* Blur overlay and unlock button */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center">
              <Button
                onClick={handleUnlockClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Unlock className="w-5 h-5" />
                Unlock Transaction Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default BankTransactionsCard;
