import { BigInt } from "@graphprotocol/graph-ts"
import {
  Burn,
  Transfer
} from "../generated/request/request"
import { TransferEvent, BurnEvent } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transfer = TransferEvent.load(event.transaction.hash.toHexString() + "-" + event.logIndex.toString())

  if (!transfer) {
  transfer = new TransferEvent(event.transaction.hash.toHexString()) + "-" + event.logIndex.toString()
}

transfer.senderAddress = event.params.from
transfer.receiverAddress = event.params.to
transfer.value = event.params.value
transfer.block = event.block.number
transfer.timestamp = event.block.timestamp
transfer.transactionId = event.transaction.hash

transfer.save()

}

export function handleBurn(event: Burn): void {
  let burn = BurnEvent.load(event.transaction.hash.toHexString() + "-" + event.logIndex.toString())

  if (!burn) {
  burn = new BurnEvent(event.transaction.hash.toHexString()) + "-" + event.logIndex.toString()
}

burn.burnerAddress = event.params._burner
burn.value = event.params._value
burn.blockNumber = event.block.number
burn.timestamp = event.block.timestamp
burn.transactionId = event.transaction.hash

burn.save()
}
