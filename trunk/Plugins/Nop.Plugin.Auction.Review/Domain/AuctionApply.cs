using Nop.Core;
namespace Nop.Plugin.Auction.Review.Domain
{
    public partial class AuctionApply : BaseEntity
    {
        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        public string Description { get; set; }


    }
}
