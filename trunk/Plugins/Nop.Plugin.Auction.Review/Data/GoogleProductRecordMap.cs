using System.Data.Entity.ModelConfiguration;
using Nop.Plugin.Auction.Review.Domain;

namespace Nop.Plugin.Auction.Review.Data
{
    public partial class GoogleProductRecordMap : EntityTypeConfiguration<GoogleProductRecord>
    {
        public GoogleProductRecordMap()
        {
            this.ToTable("GoogleProduct");
            this.HasKey(x => x.Id);
        }
    }
}